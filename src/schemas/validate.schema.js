import joi from "joi";

export const gameObject = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().required().min(1),
    pricePerDay: joi.number().required().min(1)
  })

export const customerObject = joi.object({
    name: joi.string().required(),
    phone: joi.string().regex(/^\d+$/).min(10).max(11).required(),
    cpf: joi.string().regex(/^\d+$/).length(11).required(),
    birthday: joi.date().required()
  })

export const rentalObject = joi.object({
    customerId: joi.number().required().min(1),
    gameId: joi.number().required().min(1),
    daysRented: joi.number().required().min(1),
  })