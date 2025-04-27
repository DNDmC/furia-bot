// Handlers para comandos do bot

const User = require('./src/models/User');
const UserPreferences = require('./src/Preferences');
const { showMainMenu, showAllTeamsMenu, showSettings } = require('../menus/menus');

// Handler para o comando /start
async function handleStart(bot, msg) {
  const chatId = msg.chat.id;
  const user = {
    telegramId: msg.from.id,
    username: msg.from.username,
    firstName: msg.from.first_name,
    lastName: msg.from.last_name
  };
  
  try {
    // Salvar ou atualizar usuário
    await User.findOneAndUpdate(
      { telegramId: user.telegramId },
      user,
      { upsert: true, new: true }
    );
    
    // Criar ou atualizar preferências do usuário
    await UserPreferences.findOneAndUpdate(
      { telegramId: user.telegramId },
      { telegramId: user.telegramId },
      { upsert: true, new: true }
    );
    
    // Mensagem de boas-vindas com opção de escolha de time
    bot.sendMessage(
      chatId,
      `👋 Olá, ${user.firstName}! Sou o bot oficial dos fãs da FURIA!
      
🔥 Estou aqui para te manter atualizado(a) sobre tudo relacionado aos times ativos da FURIA Esports.
      
Qual time você gostaria de acompanhar?`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🎮 CS', callback_data: 'team_cs' },
              { text: '🎯 VALORANT', callback_data: 'team_valorant' }
            ],
            [
              { text: '🧙 League of Legends', callback_data: 'team_lol' },
              { text: '🛡️ Rainbow Six', callback_data: 'team_r6' }
            ],
            [
              { text: '👀 Ver todos os times', callback_data: 'team_all' }
            ]
          ]
        }
      }
    );
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    bot.sendMessage(chatId, 'Ocorreu um erro ao iniciar. Por favor, tente novamente mais tarde.');
  }
}

// Handler para o comando /menu
async function handleMenu(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  try {
    const userPrefs = await UserPreferences.findOne({ telegramId: userId });
    
    if (!userPrefs) {
      bot.sendMessage(chatId, 'Por favor, inicie o bot primeiro usando o comando /start');
      return;
    }
    
    showMainMenu(bot, chatId, userPrefs.defaultTeam);
  } catch (error) {
    console.error('Erro ao carregar preferências:', error);
    bot.sendMessage(chatId, 'Ocorreu um erro ao carregar suas preferências. Tente novamente mais tarde.');
  }
}

// Handler para o comando /cs
function handleCS(bot, msg) {
  const chatId = msg.chat.id;
  showMainMenu(bot, chatId, 'CS');
}

// Handler para o comando /valorant
function handleValorant(bot, msg) {
  const chatId = msg.chat.id;
  showMainMenu(bot, chatId, 'VALORANT');
}

// Handler para o comando /lol
function handleLOL(bot, msg) {
  const chatId = msg.chat.id;
  showMainMenu(bot, chatId, 'LOL');
}

// Handler para o comando /r6
function handleR6(bot, msg) {
  const chatId = msg.chat.id;
  showMainMenu(bot, chatId, 'R6');
}

// Handler para o comando /times
function handleTimes(bot, msg) {
  const chatId = msg.chat.id;
  showAllTeamsMenu(bot, chatId);
}

// Handler para o comando /config
async function handleConfig(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  showSettings(bot, chatId, userId);
}

module.exports = {
  handleStart,
  handleMenu,
  handleCS,
  handleValorant,
  handleLOL,
  handleR6,
  handleTimes,
  handleConfig
};