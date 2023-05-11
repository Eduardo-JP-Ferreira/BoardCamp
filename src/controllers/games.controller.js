import { db } from "../database/connection.js"

export async function getGames(req, res) {
    try {
        const receitas = await db.query(`SELECT * FROM games;`)
        console.table(receitas.rows)
        res.send(receitas.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}