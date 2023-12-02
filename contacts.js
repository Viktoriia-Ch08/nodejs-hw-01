const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find(contact => contact.id === contactId);
  return contactById || null;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
