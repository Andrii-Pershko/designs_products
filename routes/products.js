const express = require("express");
const {
  updateProduct,
  addProducts,
  getAllProducts,
} = require("../API/products");
const isValidId = require("../middlewares/isValidId");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProducts);
router.put("/:contactId", isValidId, updateProduct);

module.exports = router;
