const express = require("express");
const {
  authenticateUser,
  logoutUser,
  verifyEmail,
} = require("../controllers/authController");

const router = express.Router();

router.post("/", authenticateUser);
router.post("/logout", logoutUser);
router.post("/verify-email", verifyEmail);

module.exports = router;
