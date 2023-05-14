import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { getCustomers, getCustomersById, postCustomers } from "../controllers/customers.controller.js";
import { customerObject } from "../schemas/validate.schema.js";


const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomersById)
customersRouter.post("/customers",validateSchema(customerObject), postCustomers)

export default customersRouter