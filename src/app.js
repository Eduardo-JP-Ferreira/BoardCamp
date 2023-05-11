import express from "express"
import cors from "cors"
import gamesRouter from "./routes/games.routes.js"

// Criação do servidor
const app = express()

// Configurações
app.use(express.json())
app.use(cors())
app.use(gamesRouter)

// Deixa o app escutando, à espera de requisições
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor rodando na portaa ${PORT}`))