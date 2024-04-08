const { cntrlWrappers, HttpError } = require("../helpers");
const fs = require("fs");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);
const cloudinary = require("cloudinary").v2;
const { api_key, api_secret, cloud_name } = process.env;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true,
});

const Joi = require("joi");

const addProductsSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.string().required(),
  characreristick: Joi.string().required(),
  img: Joi.string(),
  type: Joi.string(),
});

const updateProductsSchema = Joi.object({
  title: Joi.string(),
  price: Joi.string(),
  characreristick: Joi.string(),
  img: Joi.string(),
  type: Joi.string(),
}).or("title", "price", "characreristick", "img", "type");

const getAllProducts = async (req, res) => {
  const results = await Products.find();

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

  const uploadedImage = await cloudinary.uploader.upload(req.file.path);
  await unlinkAsync(req.file.path);
  const imageUrl = uploadedImage.secure_url;

  const newProduct = await Products.create({
    ...req.body,
    img: imageUrl,
  });
  res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { error } = updateProductsSchema.validate(req.body);
  if (error) {
    const emptyRequired = error.details[0].path;
    res.status(400).json({ message: `missing fields ${emptyRequired}` });
    return;
  }

  let imageUrl = null;

  if (req.file !== undefined) {
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);
    await unlinkAsync(req.file.path);
    imageUrl = uploadedImage.secure_url;
  }

  const id = req.params.contactId;
  const product = {
    ...req.body,
    ...(imageUrl === null ? {} : { img: imageUrl }),
  };

  await Products.findOneAndUpdate({ _id: id }, product, { new: true })
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

const removeProduct = async (req, res, next) => {
  const id = req.params.contactId;

  await Products.findByIdAndRemove({ _id: id }).then((user) => {
    if (user) {
      return res.status(200).json({ user, message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  });
};

module.exports = {
  updateProduct: cntrlWrappers(updateProduct),
  getAllProducts: cntrlWrappers(getAllProducts),
  removeProduct: cntrlWrappers(removeProduct),
  addProducts: cntrlWrappers(addProducts),
};
