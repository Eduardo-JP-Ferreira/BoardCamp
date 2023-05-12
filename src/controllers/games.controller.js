import { db } from "../database/connection.js"

export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games;`)
        console.table(games.rows)
        res.send(games.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postGames(req, res) {
    const {name, image, stockTotal, pricePerDay} = req.body
    try {
        const games = await db.query(`SELECT * FROM games WHERE name = $1;`,[name])

        if(games.rows[0]){
            res.status(409).send("Nome de Jogo já existente")
        }
        else{
            const postGame = await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
            VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay])
        }
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}