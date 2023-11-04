const express = require("express");
const { isAdmin, refreshAdmin } = require("../API/admin");
const { loginCheck, isValidId, upload } = require("../middlewares");
const {
  addProducts,
  updateProduct,
  removeProduct,
} = require("../API/products");

const router = express.Router();

router.get("/", refreshAdmin);
router.post("/", isAdmin);
router.post("/add_product", loginCheck, upload.single("img"), addProducts);
router.put("/:contactId", loginCheck, isValidId, upload.single("img"), updateProduct);
router.delete("/:contactId", loginCheck, isValidId, removeProduct);

module.exports = router;
