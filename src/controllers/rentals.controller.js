import dayjs from "dayjs"
import { db } from "../database/connection.js"

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`SELECT * FROM rentals;`)
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`,[rentals.rows[0].customerId])
        const game = await db.query(`SELECT * FROM games WHERE id = $1;`,[rentals.rows[0].gameId])
  
        const arr =[]
        
        for(let i=0;i<rentals.rows.length;i++){
            const rentalsObject = {
                id: rentals.rows[i].id,
                customerId: rentals.rows[i].customerId,
                gameId: rentals.rows[i].gameId,
                rentDate: dayjs(rentals.rows[i].rentDate).format('YYYY-MM-DD'),
                daysRented: rentals.rows[i].daysRented,
                returnDate: dayjs(rentals.rows[i].returnDate),
                originalPrice: rentals.rows[i].originalPrice,
                delayFee: rentals.rows[i].delayFee,

                customer: {
                    id: rentals.rows[i].customerId,
                    name: customer.rows[0].name
                },
                game: {
                    id: rentals.rows[i].gameId,
                    name: game.rows[0].name
                }

            }
            arr.push(rentalsObject)
        }
        console.table(rentals.rows)
        res.send(arr)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postRental(req, res) {
    const {customerId, gameId, daysRented} = req.body
    try {
     
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`,[customerId])
        const game = await db.query(`SELECT * FROM games WHERE id = $1;`,[gameId])
        const rentals = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1;`,[gameId])


        if(!customer.rows[0] || !game.rows[0] || rentals.rows.length >= game.rows[0].stockTotal){
            return res.sendStatus(400)
        }

        const rentDate = dayjs().format('YYYY-MM-DD')
        // const rentDate = '2023-05-08'
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

export async function returnRental(req, res) {
    const {id} = req.params
    try {
     
        const rental = await db.query(`SELECT * FROM rentals WHERE id = $1;`,[id])
        

        if(!rental.rows[0]){
            return res.sendStatus(404)
        }

        if(rental.rows[0].returnDate != null){
            return res.sendStatus(400)
        }
        else{            
            let delayFee =null
            const rentDate = dayjs(rental.rows[0].rentDate)
            const returnDate = dayjs()
            const dateReturn = rentDate.add(rental.rows[0].daysRented, 'day');
            const delayed = returnDate.diff(dateReturn,'day');
            
            if(delayed>0){
                const pricePerDay = rental.rows[0].originalPrice /rental.rows[0].daysRented
                delayFee = delayed * pricePerDay
            }

            const updateRental = await db.query(`
            UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 
            WHERE id=$3;`, [returnDate.format('YYYY-MM-DD'),delayFee, id])
            
            return res.sendStatus(200)
        }

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

            if(rental.rows[0].returnDate != null){
                const deleteRentals = await db.query(`DELETE FROM rentals WHERE id = $1;`, [id])
                res.sendStatus(200)
            }
            else{
                res.sendStatus(400)
            }

            
        }
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}