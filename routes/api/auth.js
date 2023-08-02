const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const {
  registerAndLoginSchema,
  emailVerifySchema,
} = require("../../schemas/users");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(registerAndLoginSchema),
  register
);

router.get("/users/verify/:verificationToken", verifyEmail);

router.post(
  "/users/verify",
  validateBody(emailVerifySchema),
  resendVerifyEmail
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
