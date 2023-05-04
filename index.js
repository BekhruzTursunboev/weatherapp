const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6028959212:AAEefWfMXT77qVs__46rYv0OeNBiKY4Famo';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Listen for incoming messages
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Привет напиши имя города а я покажу погоду");
  });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const location = msg.text;
  if (location === '/start') {
    // Do nothing if the message is the /start command
    return;
  }

  // Make an API call to get weather data
  request(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b3d863b9c5adfb6520f349d4a2012f12`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const weatherData = JSON.parse(body);
      const temperature = Math.round(weatherData.main.temp - 273.15);
      const description = weatherData.weather[0].description;
      const message = `Температура в  ${location} составляет ${temperature}°C и погода ${description}.`;

      // Send the weather information back to the user on Telegram
      bot.sendMessage(chatId, message);
    }else if(location =='/start'){

    } 
    else {
      // Handle errors
      bot.sendMessage(chatId, 'Извините,я не могу распознать город можете отправить снова,если вы написали на русском то напиишите имя города на английском');
    }
  });
})