const { cntrlWrappers } = require("../helpers");
const axios = require("axios");
const { Orders } = require("../models/orders");
const telegramBotToken = "6460421172:AAFWTaVrMTDKMABXMcXOIM5w3pe5TZ6TQho";
const chatId = "609860130"; // Ідентифікатор вашого чату (можна отримати у @getidsbot у Телеграмі)
const Joi = require("joi");

const newOrderSchema = Joi.object({
  number: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  adress: Joi.string(),
  products: Joi.string(),
});

const newOrder = async (req, res) => {
  const {
    userData,
    orderData: { totalPrice, orderList },
  } = req.body;

  const orders = await Orders.find();

  const newOrder = {
    number: orders.length + 1,
    products: orderList,
    ...userData,
  };

  const { error } = newOrderSchema.validate(req.body);

  if (error) {
    const emptyRequired = error.details[0].path;
    res
      .status(400)
      .json({ message: `Поле ${emptyRequired} відсутнє або зайве` });
    return;
  }

  Orders.create(newOrder)
    .then((response) => {
      const message = `
  Нове замовлення:\nІм'я отримувача: ${userData.name}\nНомер телефону: ${
        userData.phone
      }\nАдреса замовлення: ${
        userData.adress
      }\nЗагальна вартість: ${totalPrice} грн\n\n${orderList.map(
        (order, index) =>
          `${index + 1}) Назва продукту: ${order.title}\n Кількість: ${
            order.amount
          } шт\n Вартість одиниці: ${order.price} грн\n\n`
      )}
  `;

      // Надсилання повідомлення в телеграм
      sendTelegramMessage(message.replace(/,/g, ""))
        .then((response) => {
          res.status(200).json({
            success: true,
            message: "Повідомлення надіслано в телеграм.",
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({
            success: false,
            message: "Помилка надсилання повідомлення в телеграм.",
          });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Помилка надсилання повідомлення в телеграм.",
      });
    });
};

async function sendTelegramMessage(message) {
  const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  const data = {
    chat_id: chatId,
    text: message,
  };

  try {
    const response = await axios.post(apiUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  newOrder: cntrlWrappers(newOrder),
};
