import ctrlWrapper from "../helpers/ctrlWrappers.js";
import HttpError from "../helpers/HttpErrors.js";
import contactsService from "../services/contactsServices.js";



const getAllContacts = async (req, res) => {

        const allContacts = await contactsService.listContacts();
        res.json(allContacts);
};

const getOneContact = async (req, res) => {
    const { id } = req.params;

        const contactId = await contactsService.getContactById(id);
        if (!contactId) {
            throw HttpError(404);
        }
        res.json(contactId);

};

const deleteContact = async (req, res) => {
    const { id } = req.params;

        const delContact = await contactsService.removeContact(id);
        if (!delContact) {
            throw HttpError(404);
        }
        res.json(delContact);

};

const createContact = async (req, res) => {
    
        const newContact = await contactsService.addContact(req.body);
        res.status(201).json(newContact);

};

const updateContact = async (req, res) => {
    const { id } = req.params;

        if (Object.keys(req.body).length === 0) {
            throw HttpError(400, "Body must have at least one field")
        };

        const updateContact = await contactsService.updateContacts(id, req.body);

        if (!updateContact) {
            throw HttpError(404);
        };
        res.json(updateContact);
};

const updateStatus = async (req, res) => {
    const {id} = req.params;
    const {favorite} = req.body;
    console.log(favorite)

    console.log(id)

    if (Object.keys(req.body).length === 0) {
        throw HttpError(400, "Body must have at least one field")
    };

    const updStatusContact = await contactsService.updateStatusContact(id, req.body);
    if (!updStatusContact) {
        throw HttpError(404);
    };
    res.json(updStatusContact);
}

const controller = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatus: ctrlWrapper(updateStatus),
};


export default controller;