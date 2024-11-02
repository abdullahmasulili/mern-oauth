const express = require("express");
const {
  authenticateUser,
  logoutUser,
  verifyEmail,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser);
router.post("/logout", logoutUser);
router.post("/verify-email", authMiddleware, verifyEmail);

module.exports = router;
