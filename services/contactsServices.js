import Contact from "../db/models/Contact.js";


function listContacts(query = {}, page = 1, limit = 20, favorite = false) {

    const normLimit = Number(limit);
    const normOffset = (Number(page) - 1) * normLimit;

    if (favorite) {
        query.favorite = favorite === 'true';
    }

    const contactsList = Contact.findAll({
        where: query,
        offset: normOffset,
        limit: normLimit,
    });

    return contactsList;
};


function getContactById(query) {

    const contact = Contact.findOne({
        where: query
    });

    if (!contact) {
        return null;
    };

    return contact;
};

async function removeContact(query) {

    const remContact = await Contact.findOne({
        where: query
    });

    if (!remContact) {
        return null;
    };

    Contact.destroy({
        where: query
    });


    return remContact;
};

function addContact(query) {

    const newContact = Contact.create(query);
    return newContact;

};

async function updateContacts(query, data) {

    await Contact.update(
        data,
        {
            where: query
        });


    const updContact = Contact.findOne({ where: query });

    return updContact;
};

async function updateStatusContact(query, data) {

    await Contact.update(data, { where: query });

    const statusUpdContact = Contact.findOne({ where: query });

    return statusUpdContact;
};

const contactsService = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContacts,
    updateStatusContact,
};

export default contactsService