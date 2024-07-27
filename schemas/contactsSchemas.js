import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().alphanum().min(1).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().alphanum().min(1).max(30),
    email: Joi.string().email(),
    phone: Joi.string().min(7),
});