import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z0-9 ]+$/).min(1).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).required(),
    favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z0-9 ]+$/).min(1).max(100),
    email: Joi.string().email(),
    phone: Joi.string().min(7),
});

export const updateStatusContactSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

