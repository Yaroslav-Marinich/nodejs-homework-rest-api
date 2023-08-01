const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = router;
