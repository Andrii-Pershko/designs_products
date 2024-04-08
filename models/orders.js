const { Schema, model } = require("mongoose");

const ordersSchema = new Schema({
  number: {
    type: String,
    required: [true, "Встановіть імя на товар"],
  },
  name: {
    type: String,
    required: [true, "Встановіть ціну на товар"],
  },
  phone: {
    type: String,
    required: [true, "Добавте опис товару"],
  },
  adress: {
    type: String,
    required: [true, "Добавте опис товару"],
  },
  products: {
    type: String,
    required: [true, "Добавте опис товару"],
  },
});

const Orders = model("orders", ordersSchema);

module.exports = { Orders, ordersSchema };
