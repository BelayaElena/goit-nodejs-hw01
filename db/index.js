const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (data) =>
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const id = String(contactId);
  const result = data.find((item) => item.id === id);
  return result || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const id = String(contactId);
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await updateContacts(data);
  return result;
}

async function addContact({ name, email, phone }) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await updateContacts(data);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
