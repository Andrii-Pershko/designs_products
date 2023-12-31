const express = require("express");
const { getAllProducts } = require("../API/products");

const router = express.Router();

router.get("/", getAllProducts);

module.exports = router;
