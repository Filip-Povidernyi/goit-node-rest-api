import HttpError from "../helpers/HttpErrors.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const allContacts = await contactsService.listContacts();
        res.json(allContacts);
    }
    catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    const { id } = req.params;

    try {
        const contactId = await contactsService.getContactById(id);
        if (!contactId) {
            throw HttpError(404);
        }
        res.json(contactId);
    }
    catch (error) {
        next(error);
    }
};
export const deleteContact = async (req, res, next) => {
    const { id } = req.params;
    try {
        const delContact = await contactsService.removeContact(id);
        if (!delContact) {
            throw HttpError(404);
        }
        res.json(delContact);
    }
    catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const newContact = await contactsService.addContact(req.body);
        res.status(201).json(newContact);
    }
    catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (Object.keys(req.body).length === 0) {
            throw HttpError(400, "Body must have at least one field")
        };
        const updateContact = await contactsService.updateContacts(id, req.body);
        if (!updateContact) {
            throw HttpError(404);
        };
        res.json(updateContact);
    }
    catch (error) {
        next(error);
    }

};