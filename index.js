// libs
const request     = require('request'),
      telegramBot = require('node-telegram-bot-api');

require('dotenv').config();

// creating bot
const bot = new telegramBot(process.env.TOKEN, {polling: true});

// remove keyboard
const optRemove = {
  reply_markup: {
     remove_keyboard: true
  }
};


bot.on('message', (msg) => {
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id,"Hello dear user");
  }

  var robot = "I'm robot";
  if (msg.text.indexOf(robot) === 0) {
      bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!", optRemove);
  }
});

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
      "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
      }
  });
    
    
});

bot.onText(/\/healthcheck/, (msg) => {
  bot.sendMessage(msg.chat.id, "I'm alive!");
});

bot.onText(/\/sendpic/, (msg) => {

  bot.sendPhoto(msg.chat.id,"https://cdn.expansion.mx/dims4/default/7dfd775/2147483647/thumbnail/800x450%5E/quality/75/?url=https%3A%2F%2Fcdn.expansion.mx%2Fphotos%2F2007%2F07%2F01%2Fla-nueva-campana-mostrara-a-actores-hablando-sobre-por-que-vuelven-a-wal-mart-en-busca-de-precios-mas-bajos-y-no-la-carita-feliz-reuters.2007-07-23.6291503003.jpg" );
    
});
