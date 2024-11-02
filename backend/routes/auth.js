const express = require("express");
const {
  authenticateUser,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/auth", authenticateUser);
router.post("/logout", logoutUser);

module.exports = router;
