const express = require("express");
const router = express.Router();

const { getUsers, getUserByUID } = require("../controllers/usersController");
const checkEmailMiddleware = require("../middlewares/checkEmailMiddleware");

router.get("/", getUsers);
router.get("/:uid", checkEmailMiddleware, getUserByUID);

module.exports = router;
