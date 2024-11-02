const express = require("express");
const {
  authenticateUser,
  logoutUser,
  verifyEmail,
} = require("../controllers/authController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser);
router.post("/logout", logoutUser);
router.post("/verify-email", authenticateToken, verifyEmail);

module.exports = router;
