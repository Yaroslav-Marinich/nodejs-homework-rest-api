const express = require("express");
const {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contactsControllers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {
  postSchema,
  putSchema,
  patchSchema,
} = require("../../schemas/contactsSchema");
const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(postSchema), addContact);

router.delete("/:contactId", authenticate, isValidId, removeContact);

router.put("/:contactId", authenticate, isValidId, validateBody(putSchema), updateContact);

router.patch("/:contactId/favorite", authenticate, validateBody(patchSchema), updateFavorite);

module.exports = router;
