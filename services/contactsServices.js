const fs = require("fs/promises");
const path = require("path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "..", "models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const res = contacts.find((item) => item.id === id);
  return res || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }

  const [res] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return res;
};

const addContact = async (body) => {
  console.log(body)
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };
  console.log(newContact);
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }

  // Retrieve the existing contact
  const existingContact = contacts[idx];

  // Update the name field if provided in the body
  const updatedContact = {
    id: existingContact.id,
    name: body.name || existingContact.name,
    email: existingContact.email,
    phone: existingContact.phone,
  };

  contacts[idx] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};


module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
