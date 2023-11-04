const express = require("express");
const { newOrder } = require("../API/order");

const router = express.Router();

router.post("/", newOrder);

module.exports = router;
