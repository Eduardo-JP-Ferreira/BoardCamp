export function validateSchema(schema){
    return (req, res, next) => {
        const {name, stockTotal, pricePerDay} = req.body
        if(name===null || name=== "" || stockTotal <=0 || pricePerDay <=0){
            return res.status(400).send("Validade");
        }

        const validate = schema.validate(req.body, { abortEarly: false })
        if (validate.error) {
            const errors = validate.error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }
      next()
    }
}