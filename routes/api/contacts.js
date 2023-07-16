const express = require("express");

const ctrl = require("../../controllers/contactsControllers");

const validateBody = require("../../middlewares/validateBody");

const schema = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schema.postSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(schema.putSchema), ctrl.updateContact);

module.exports = router;
