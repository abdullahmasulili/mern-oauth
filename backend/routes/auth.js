const express = require("express");
const {
  authenticateUser,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/", authenticateUser);
router.post("/logout", logoutUser);

module.exports = router;
