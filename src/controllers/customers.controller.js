import dayjs from "dayjs"
import { db } from "../database/connection.js"

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        const arr =[]
        for(let i=0;i<customers.rows.length;i++){
            let data = dayjs(customers.rows[i].birthday).format('YYYY-MM-DD')
            const customerObject = {
                id: customers.rows[i].id,
                name: customers.rows[i].name,
                phone: customers.rows[i].phone,
                cpf: customers.rows[i].cpf,
                birthday: data
            }
            arr.push(customerObject)
        }
        console.table(customers.rows)
        res.send(arr)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postCustomers(req, res) {
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
        // console.log(birthday)
        // res.sendStatus(201)
        res.status(201).send(birthday)
    } catch (err) {
        res.status(500).send(err.message)
    }
}