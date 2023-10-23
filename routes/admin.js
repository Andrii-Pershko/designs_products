const express = require("express");
const isAdmin = require("../API/admin");

// const isValidId = require("../middlewares/isValidId");

const router = express.Router();

router.post("/", isAdmin);

module.exports = router;
