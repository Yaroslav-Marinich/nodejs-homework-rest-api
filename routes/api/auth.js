const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { registerAndLoginSchema } = require("../../schemas/users");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(registerAndLoginSchema),
  register
);

router.post("/users/login", validateBody(registerAndLoginSchema), login);

router.get("/users/current", authenticate, getCurrent);

router.post("/users/logout", authenticate, logout);

module.exports = router;
