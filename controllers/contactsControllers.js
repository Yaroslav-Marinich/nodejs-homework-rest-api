const ctrlWrapper= require("../helpers/ctrlWraper");
const HttpError = require("../helpers/ctrlWraper");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/contactsServices");


const getAll = async (_, res) => {
  const result = await listContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw new HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const addNewContact = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw new HttpError(404, "Not Found");
  }
  res.status(201).json("Contact deleted");
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    throw new HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getOneContact),
  addContact: ctrlWrapper(addNewContact),
  removeContact: ctrlWrapper(removeContactById),
  updateContact: ctrlWrapper(updateContactById),
};
