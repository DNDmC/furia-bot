// ARQUIVO: src/index.js
// Bot do Telegram para fãs dos times ativos da FURIA: CS, Valorant, League of Legends e Rainbow Six Siege

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Importação dos módulos
const { connectToDatabase } = require('./config/database');
const commandHandlers = require('./handlers/commands');
const callbackHandlers = require('./handlers/callbacks');

// Configuração do bot
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Inicialização
async function startBot() {
  try {
    // Conectar ao banco de dados
    await connectToDatabase();

    // Registrar handlers de comandos
    bot.onText(/\/start/, (msg) => commandHandlers.handleStart(bot, msg));
    bot.onText(/\/menu/, (msg) => commandHandlers.handleMenu(bot, msg));
    bot.onText(/\/cs/, (msg) => commandHandlers.handleCS(bot, msg));
    bot.onText(/\/valorant/, (msg) => commandHandlers.handleValorant(bot, msg));
    bot.onText(/\/lol/, (msg) => commandHandlers.handleLOL(bot, msg));
    bot.onText(/\/r6/, (msg) => commandHandlers.handleR6(bot, msg));
    bot.onText(/\/times/, (msg) => commandHandlers.handleTimes(bot, msg));
    bot.onText(/\/config/, (msg) => commandHandlers.handleConfig(bot, msg));

    // Registrar handler de callbacks (botões inline)
    bot.on('callback_query', (callbackQuery) => callbackHandlers.handleCallbackQuery(bot, callbackQuery));

    console.log('Bot da FURIA CS, VALORANT, LoL e R6 iniciado!');
  } catch (error) {
    console.error('Erro ao iniciar o bot:', error);
  }
}

// Iniciar o bot
startBot();

// Exportar o bot para uso em outros módulos
module.exports = bot;