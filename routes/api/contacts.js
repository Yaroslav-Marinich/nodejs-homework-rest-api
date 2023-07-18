const express = require("express");
const {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contactsControllers");
const validateBody = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");
const {
  postSchema,
  putSchema,
  patchSchema,
} = require("../../schemas/contactsSchema");
const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(postSchema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, validateBody(putSchema), updateContact);

router.patch("/:contactId/favorite", validateBody(patchSchema), updateFavorite);

module.exports = router;
