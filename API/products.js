const { cntrlWrappers, HttpError } = require("../helpers");
const { Products } = require("../models/products");

const Joi = require("joi");

const addProductsSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.string().required(),
  characreristick: Joi.string().required(),
  img: Joi.string().required(),
});

const updateProductsSchema = Joi.object({
  title: Joi.string(),
  price: Joi.string(),
  characreristick: Joi.string(),
  img: Joi.string(),
}).or("title", "price", "characreristick", "img");

const getAllProducts = async (req, res) => {
  const results = await Products.find();
  console.log("Example", results);
  res.status(201).json(results);
};

const addProducts = async (req, res) => {
  const { error } = addProductsSchema.validate(req.body);

  if (error) {
    const emptyRequired = error.details[0].path;
    res
      .status(400)
      .json({ message: `Поле ${emptyRequired} відсутнє або зайве` });
    return;
  }

  const newProduct = await Products.create({
    ...req.body,
  });
  res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { error } = updateProductsSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const id = req.params.contactId;

  await Products.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((updateProducts) => {
      if (updateProducts) {
        return res.status(200).json(updateProducts);
      } else {
        res.status(404).json({ message: "Products not found" });
      }
    })
    .catch((err) => {
      HttpError(err.status, `${err.message}`);
    });
};


// const getContactById = async (req, res, next) => {
//   const id = req.params.contactId;
//   const owner = req.user._id;

//   await Contact.findOne({ _id: id, owner }).then((user) => {
//     if (user) {
//       return res.json(user);
//     } else {
//       res.status(404).json({ message: "Contact not found" });
//     }
//   });
// };

// const updateContact = async (req, res, next) => {
//   const { error } = putSchema.validate(req.body);
//   if (error) {
//     res.status(400).json({ message: "missing fields" });
//     return;
//   }

//   const id = req.params.contactId;
//   const { _id: owner } = req.user;

//   await Contact.findOneAndUpdate({ _id: id, owner }, req.body, { new: true })
//     .then((updatedContact) => {
//       if (updatedContact) {
//         return res.status(200).json(updatedContact);
//       } else {
//         res.status(404).json({ message: "Contact not found" });
//       }
//     })
//     .catch((err) => {
//       HttpError(err.status, `${err.message}`);
//     });
// };

// const updateStatusContact = async (req, res, next) => {
//   const { error } = updateFavoriteSchema.validate(req.body);

//   if (error) {
//     const emptyRequired = error.details[0].path;
//     res.status(400).json({ message: `missing required ${emptyRequired}` });
//     return;
//   }

//   const id = req.params.contactId;
//   const { _id: owner } = req.user;

//   await Contact.findOneAndUpdate({ _id: id, owner }, req.body, { new: true })
//     .then((updatedContact) => {
//       if (updatedContact) {
//         return res.status(200).json(updatedContact);
//       } else {
//         res.status(404).json({ message: "Contact not found" });
//       }
//     })
//     .catch((err) => {
//       HttpError(err.status, `${err.message}`);
//     });
// };

// const removeContact = async (req, res, next) => {
//   const id = req.params.contactId;
//   const owner = req.user._id;

//   await Contact.findByIdAndRemove({ _id: id, owner }).then((user) => {
//     if (user) {
//       return res.status(200).json({ user, message: "Contact deleted" });
//     } else {
//       res.status(404).json({ message: "Contact not found" });
//     }
//   });
// };

module.exports = {
  // updateStatusContact: cntrlWrappers(updateStatusContact),
  updateProduct: cntrlWrappers(updateProduct),
  getAllProducts: cntrlWrappers(getAllProducts),
  // getContactById: cntrlWrappers(getContactById),
  // removeContact: cntrlWrappers(removeContact),
  addProducts: cntrlWrappers(addProducts),
};
