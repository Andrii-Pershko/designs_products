const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
  title: {
    type: String,
    required: [true, "Встановіть імя на товар"],
  },
  price: {
    type: String,
    required: [true, "Встановіть ціну на товар"],
  },
  characreristick: {
    type: String,
    required: [true, "Добавте опис товару"],
  },
  img: { type: String, required: [true, "Додайте шлях до зображення"] },
  type: {
    type: String,
    required: [true, "Оберіть тип товару"],
  },
});

const Products = model("products", productsSchema);

module.exports = { Products, productsSchema };
