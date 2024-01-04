const { writeFile, readFile } = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  const contacts = await readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deleteContact] = contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deleteContact;
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;

  // ...твой код. Возвращает объект добавленного контакта.
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
