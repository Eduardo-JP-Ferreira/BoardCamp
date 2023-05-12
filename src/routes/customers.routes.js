import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { getCustomers, postCustomers } from "../controllers/customers.controller.js";
import { customerObject } from "../schemas/validate.schema.js";


const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.post("/customers",validateSchema(customerObject), postCustomers)

export default customersRouter