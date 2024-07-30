import { sequelize } from "../db/db_server.js";
import { DataTypes } from "sequelize";



const Contact = sequelize.define(
    'contacts', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

},
    {
        timestamps: false,
    },
);


async function listContacts() {

    const contactsList = await Contact.findAll();

    return contactsList;
};


async function getContactById(contactId) {

    const contact = await Contact.findAll({
        where: {
            id: contactId,
        },
    });

    if (!contact.length) {
        return null;
    };

    return contact[0];
};

async function removeContact(contactId) {

    const remContact = await Contact.findAll({
        where:
            { id: contactId, },
    });

    await Contact.destroy({
        where:
            { id: contactId, },
    });

    if (!remContact.length) {
        return null;
    };

    return remContact[0];
};

async function addContact(data) {

    const newContact = await Contact.create({
        ...data,
    });


    return newContact;

};

async function updateContacts(id, data) {

    await Contact.update({
        ...data,
    },
        {
            where:
                { id: id, },
        });


    const updContact = await Contact.findAll({ where: { id: id } });

    return updContact[0];
};

async function updateStatusContact(contactId, data) {

    await Contact.update({ ...data }, { where: { id: contactId } });

    const statusUpdContact = await Contact.findAll({ where: { id: contactId } });

    return statusUpdContact[0];
};

await Contact.sync();

const contactsService = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContacts,
    updateStatusContact,
};

export default contactsService