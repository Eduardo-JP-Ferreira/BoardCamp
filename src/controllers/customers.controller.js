import dayjs from "dayjs"
import { db } from "../database/connection.js"

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        const arr =[]
        for(let i=0;i<customers.rows.length;i++){
            const customerObject = {
                id: customers.rows[i].id,
                name: customers.rows[i].name,
                phone: customers.rows[i].phone,
                cpf: customers.rows[i].cpf,
                birthday: dayjs(customers.rows[i].birthday).format('YYYY-MM-DD')
            }
            arr.push(customerObject)
        }
        console.table(customers.rows)
        res.send(arr)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomerById(req, res) {
    const {id} = req.params
    try {
        const customers = await db.query(`SELECT * FROM customers WHERE id = $1;`,[id])
        
        const customerObject = {
            id: customers.rows[0].id,
            name: customers.rows[0].name,
            phone: customers.rows[0].phone,
            cpf: customers.rows[0].cpf,
            birthday: dayjs(customers.rows[0].birthday).format('YYYY-MM-DD')
        }        
        console.table(customers.rows)
        res.send(customerObject)
        
    } catch (err) {
        res.status(404).send(err.message)
    }
}

export async function postCustomer(req, res) {
    const {name,phone,cpf,birthday} = req.body
    try {
        const customers = await db.query(`SELECT * FROM customers WHERE cpf = $1;`,[cpf])

        if(customers.rows[0]){
            res.status(409).send("CPF já Cadastrado")
        }
        else{
            const postCustomers = await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday) 
            VALUES ($1, $2, $3, $4);`, [name,phone,cpf,birthday])
        }
        res.status(201).send("Created")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function updateCustomer(req, res) {
    const {id} = req.params
    const {name,phone,cpf,birthday} = req.body
    try {
        const customers = await db.query(`SELECT * FROM customers WHERE cpf = $1;`,[cpf])

        if(customers.rows[0] && customers.rows[0].id != id){
            res.status(409).send("CPF já Cadastrado")
        }
        else{
            const postCustomers = await db.query(`
            UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 
            WHERE id=$5;`, [name,phone,cpf,birthday,id])
            
            res.sendStatus(200)
        }
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}