const contacts = require('./contacts');
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case 'get':
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);

    case 'add':
      const addContact = await contacts.addContact(name, email, phone);
      return console.log(addContact);

    case 'remove':
      const contactToDelete = await contacts.removeContact(id);
      return console.log(contactToDelete);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
