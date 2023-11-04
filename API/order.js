const { cntrlWrappers } = require("../helpers");
const axios = require("axios");
const telegramBotToken = "6460421172:AAFWTaVrMTDKMABXMcXOIM5w3pe5TZ6TQho";
const chatId = "609860130"; // Ідентифікатор вашого чату (можна отримати у @getidsbot у Телеграмі)

const newOrder = async (req, res) => {
  const { name, phone, price } = req.body;
  const message = `Нове замовлення:\nІм'я отримувача: ${name}\nНомер телефону: ${phone}\nСума замовлення: ${price}`;

  // Надсилання повідомлення в телеграм
  sendTelegramMessage(message)
    .then((response) => {
      res
        .status(200)
        .json({ success: true, message: "Повідомлення надіслано в телеграм." });
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
