import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { getCustomerById, getCustomers, postCustomer, updateCustomer } from "../controllers/customers.controller.js";
import { customerObject } from "../schemas/validate.schema.js";


const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomerById)
customersRouter.post("/customers",validateSchema(customerObject), postCustomer)
customersRouter.put("/customers/:id",validateSchema(customerObject), updateCustomer)

export default customersRouter