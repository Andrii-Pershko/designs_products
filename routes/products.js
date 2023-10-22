const express = require("express");
const {
  updateProduct,
  addProducts,
  getAllProducts,
} = require("../API/products");
const isValidId = require("../middlewares/isValidId");

// const {
//   listContacts,
//   addContact,
//   getContactById,
//   updateContact,
//   updateStatusContact,
//   removeContact,
// } = require("../../api/contacts/contacts");
// const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProducts);
router.put("/:contactId", isValidId, updateProduct);

// router.post("/", authenticate, addContact);

// router.get("/:contactId", authenticate, isValidId, getContactById);

// router.delete("/:contactId", authenticate, isValidId, removeContact);

// router.put("/:contactId", authenticate, isValidId, updateContact);r

// router.patch(
//   "/:contactId/favorite",
//   authenticate,
//   isValidId,
//   updateStatusContact
// );

module.exports = router;
