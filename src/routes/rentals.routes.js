import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { deleteRental, getRentals, postRental } from "../controllers/rentals.controller.js";
import { rentalObject } from "../schemas/validate.schema.js";


const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals",validateSchema(rentalObject), postRental)
rentalsRouter.delete("/rentals/:id", deleteRental)

export default rentalsRouter