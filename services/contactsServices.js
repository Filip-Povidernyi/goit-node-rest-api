import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";



const contactsPath = path.resolve("db", "contacts.json");

const contacts = async () => {

    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
};


export async function listContacts() {

    const contactsList = await contacts();

    return contactsList;
};

export async function getContactById(contactId) {

    const contactsList = await contacts();
    const contact = contactsList.find(contact => contact.id === contactId);

    return contact || null;
};

export async function removeContact(contactId) {

    if (contactId.length !== 21) {
        console.warn(`\x1B[31m Invalid id: ${contactId}`);

        return null;
    }

    const contactsList = await contacts();

    const index = contactsList.findIndex(contact => contact.id === contactId);

    if (index === -1) {
        console.log(`\x1B[31m No contact with this id: ${contactId}`);

        return null;
    };

    const remContact = contactsList.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return remContact[0];
};

export async function addContact(data) {

    const contactsList = await contacts();

    const newContact = {
        id: nanoid(),
        ...data,
    };

    contactsList.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    return newContact;

};

export async function updateContacts(id, data) {
    const { name, email, phone } = data;
    const contactsList = await contacts();
    const contact = await getContactById(id);
    if (!contact) {
        return null;
    }
    if (name) {
        contact.name = name;
    };
    if (email) {
        contact.email = email;
    };
    if (phone) {
        contact.phone = phone;
    };

    contactsList.push(contact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

    await removeContact(id);
    return contact;
};


const contactsService = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContacts,
};

export default contactsService