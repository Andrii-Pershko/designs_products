const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpError(400, `${contactId} is not a valid ObjectId`)); // Відправляємо помилку та припиняємо виконання
  }
  next(); // Викликаємо next лише якщо id коректний
};

module.exports = isValidId;
