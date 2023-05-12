import { Router } from "express";
import { getGames, postGames } from "../controllers/games.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { gameObject } from "../schemas/validate.schema.js";

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games",validateSchema(gameObject), postGames)

export default gamesRouter