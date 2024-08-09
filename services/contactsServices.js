import Contact from "../db/models/Contact.js";


function listContacts(query={}) {

    const contactsList = Contact.findAll({where:query});

    return contactsList;
};


function getContactById(contactId) {

    const contact = Contact.findOne({
        where: {
            id: contactId,
        },
    });

    if (!contact) {
        return null;
    };

    return contact;
};

async function removeContact(id) {

    const remContact = await Contact.findOne({
        where:
            { id, },
    });

    Contact.destroy({
        where:
            { id, },
    });

    if (!remContact) {
        return null;
    };

    return remContact;
};

function addContact(data, owner) {

    const newContact = Contact.create(data, owner);
    return newContact;

};

async function updateContacts(id, data) {

    await Contact.update(
        data,
        {
            where:
                { id, },
        });


    const updContact = Contact.findOne({ where: { id, } });

    return updContact;
};

async function updateStatusContact(id, data) {

    await Contact.update(data, { where: { id, } });

    const statusUpdContact = Contact.findOne({ where: { id, } });

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