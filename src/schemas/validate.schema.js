import joi from "joi";

export const gameObject = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().required(),
    pricePerDay: joi.number().required()
  })