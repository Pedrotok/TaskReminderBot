// libs
const request     = require('request'),
      telegramBot = require('node-telegram-bot-api'),
      https       = require('https');

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
  var oi = "oi";
  if (msg.text.toString().toLowerCase().indexOf(oi) === 0) {
    bot.sendMessage(msg.chat.id,"Oi bb");
  }

  var robot = "I'm robot";
  if (msg.text.indexOf(robot) === 0) {
      bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!", optRemove);
  }
});

bot.onText(/bb/, (msg) => {
  bot.sendMessage(msg.chat.id,"tá me chamando de bebê?");
})


// commands
bot.onText(/^\/start(@\w+)*$/, (msg) => {
  var url = `https://trello.com/1/authorize?expiration=1day&name=HappyTaskReminderBot&scope=read&response_type=token&key=${process.env.TRELLOKEY}`
  bot.sendMessage(msg.chat.id, "Welcome " + url);
});

bot.onText(/^\/sendToken(@\w+)*$/, (msg) => {
  var _trello;
  bot.sendMessage(msg.chat.id, "Ok, send me the token trello gave you.");
  bot.on('message', (msg) => {
    //TODO: persistence
    _trello = {
      token : msg.text,
      id    : msg.chat.id
    }
    //TODO: request boards from trello api
    const url = `https://api.trello.com/1/members/me/boards?key=${process.env.TRELLOKEY}&token=${_trello.token}`;
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        var boardsObj= JSON.parse(data);
        console.log(boardsObj);
      });
    }).on('error', (err) => {
      console.error(err);
    })
  })
});

bot.onText(/^\/healthcheck(@\w+)*$/, (msg) => {
  bot.sendMessage(msg.chat.id, "I'm alive!");
});

bot.onText(/^\/happyface(@\w+)*$/, (msg) => {

  bot.sendPhoto(msg.chat.id,"https://cdn.expansion.mx/dims4/default/7dfd775/2147483647/thumbnail/800x450%5E/quality/75/?url=https%3A%2F%2Fcdn.expansion.mx%2Fphotos%2F2007%2F07%2F01%2Fla-nueva-campana-mostrara-a-actores-hablando-sobre-por-que-vuelven-a-wal-mart-en-busca-de-precios-mas-bajos-y-no-la-carita-feliz-reuters.2007-07-23.6291503003.jpg" );
    
});

// handling errors
bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});
