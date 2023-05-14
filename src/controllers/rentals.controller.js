import dayjs from "dayjs"
import { db } from "../database/connection.js"

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`SELECT * FROM rentals;`)
  
        console.table(rentals.rows)
        res.send(rentals.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postRental(req, res) {
    const {customerId, gameId, daysRented} = req.body
    try {
     
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`,[customerId])
        const game = await db.query(`SELECT * FROM games WHERE id = $1;`,[gameId])

        if(!customer.rows[0] || !game.rows[0]){
            return res.sendStatus(400)
        }

        const rentDate = dayjs().format('YYYY-MM-DD')
        const returnDate = null
        const originalPrice = Number(game.rows[0].pricePerDay) * daysRented
        const delayFee = null

        const postRental = await db.query(`
        INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES ($1, $2, $3, $4, $5, $6, $7);`
        , [customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee])

        // console.table(customer.rows[0])
        // console.table(game.rows[0])
        res.status(201).send("OK")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRental(req, res) {
    const {id} = req.params
    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id = $1;`,[id])

        if(!rental.rows[0]){
            res.status(404).send("Id não existe")
        }
        else{
            const deleteRentals = await db.query(`DELETE FROM rentals WHERE id = $1;`, [id])
            
            res.sendStatus(200)
        }
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}