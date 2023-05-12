import { db } from "../database/connection.js"

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        console.table(customers .rows)
        res.send(customers .rows)
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
        console.log(birthday)
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}