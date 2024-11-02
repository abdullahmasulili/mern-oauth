const express = require("express");
const router = express.Router();

const { getUsers, getUserByUID } = require("../controllers/usersController");

router.get("/", getUsers);
router.get("/:uid", getUserByUID);

module.exports = router;
