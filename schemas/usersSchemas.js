import Joi from "joi";



const complexPasswordSchema = Joi.string()
    .min(8)
    .max(16)
    .pattern(new RegExp('(?=.*[a-z])'))
    .pattern(new RegExp('(?=.*[A-Z])'))
    .pattern(new RegExp('(?=.*[0-9])'))
    .pattern(new RegExp('(?=.*[!@#$%^&*])'))
    .required();


export const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: complexPasswordSchema,
});