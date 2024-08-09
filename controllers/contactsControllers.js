import ctrlWrapper from "../helpers/ctrlWrappers.js";
import HttpError from "../helpers/HttpErrors.js";
import contactsService from "../services/contactsServices.js";



const getAllContacts = async (req, res) => {

    const {id: owner} = req.user;
    const allContacts = await contactsService.listContacts({owner});
    res.json(allContacts);
};

const getOneContact = async (req, res) => {
    
    const { id } = req.params;

    const contactId = await contactsService.getContactById(id);

    if (!contactId) {
        throw HttpError(404);
    };

    res.json(contactId);

};

const deleteContact = async (req, res) => {
    const { id } = req.params;

    const delContact = await contactsService.removeContact(id);

    if (!delContact) {
        throw HttpError(404);
    };

    res.json(delContact);

};

const createContact = async (req, res) => {

    const {id: owner} = req.user;

    const newContact = await contactsService.addContact(...req.body, owner);

    res.status(201).json(newContact);

};

const updateContact = async (req, res) => {
    const { id } = req.params;

    const updateContact = await contactsService.updateContacts(id, req.body);

    if (!updateContact) {
        throw HttpError(404);
    };

    res.json(updateContact);
};

const updateStatus = async (req, res) => {
    const { id } = req.params;

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