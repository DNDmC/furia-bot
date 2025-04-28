// Handlers para callbacks (botões)

const UserPreferences = require('../Preferences');
const { getTeamName } = require('../utils/helpers');
const { 
  showMainMenu, 
  showAllTeamsMenu, 
  showSettings, 
  showPlayersList,
  displayMatches,
  displayResults,
  displayTeamStats,
  showPlayerInfo
} = require('../menus/menus');

// Importar dados dos times
const csData = require('./src/data/csData');
const valorantData = require('./src/data/valorantData');
const lolData = require('./src/data/lolData');
const r6Data = require('./src/data/r6Data');

// Handler para callbacks (botões)
async function handleCallbackQuery(bot, callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  const userId = callbackQuery.from.id;
  
  // Registrar qual botão foi clicado
  console.log(`Usuário ${userId} clicou em: ${data}`);
  
  try {
    // Respostas com base no botão clicado
    if (data.startsWith('team_')) {
      // Seleção de time principal
      await handleTeamSelection(bot, chatId, userId, data);
    } else if (data.match(/^(cs|valorant|lol|r6)_upcoming_matches$/)) {
      // Próximos jogos
      await handleUpcomingMatches(bot, chatId, data);
    } else if (data.match(/^(cs|valorant|lol|r6)_recent_results$/)) {
      // Resultados recentes
      await handleRecentResults(bot, chatId, data);
    } else if (data.match(/^(cs|valorant|lol|r6)_players$/)) {
      // Lista de jogadores
      await handlePlayersList(bot, chatId, data);
    } else if (data.match(/^(cs|valorant|lol|r6)_stats$/)) {
      // Estatísticas do time
      await handleTeamStats(bot, chatId, data);
    } else if (data === 'switch_team') {
      // Trocar de time
      showTeamSwitchMenu(bot, chatId);
    } else if (data === 'main_menu') {
      // Menu principal
      const userPrefs = await UserPreferences.findOne({ telegramId: userId });
      showMainMenu(bot, chatId, userPrefs.defaultTeam);
    } else if (data === 'all_teams_menu') {
      // Menu de todos os times
      showAllTeamsMenu(bot, chatId);
    } else if (data === 'settings') {
      // Configurações
      showSettings(bot, chatId, userId);
    } else if (data.match(/^toggle_(.+)_notifications$/)) {
      // Toggle de notificações
      await handleToggleNotifications(bot, chatId, userId, data);
    } else if (data.match(/^(cs|valorant|lol|r6)_player_/)) {
      // Informações de jogador
      await handlePlayerInfo(bot, chatId, data);
    }
  } catch (error) {
    console.error(`Erro ao processar callback ${data}:`, error);
    bot.sendMessage(chatId, 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.');
  }
  
  // Responder ao callback para remover o "carregando" no botão
  bot.answerCallbackQuery(callbackQuery.id);
}

// Função para lidar com a seleção de time
async function handleTeamSelection(bot, chatId, userId, data) {
  const team = data.split('_')[1].toUpperCase();
  
  if (team === 'ALL') {
    // Mostrar todos os times
    await UserPreferences.findOneAndUpdate(
      { telegramId: userId },
      { defaultTeam: 'CS' } // Definimos CS como padrão mas mostramos todos
    );
    showAllTeamsMenu(bot, chatId);
  } else {
    // Mostrar menu do time selecionado
    await UserPreferences.findOneAndUpdate(
      { telegramId: userId },
      { defaultTeam: team }
    );
    showMainMenu(bot, chatId, team);
  }
}

// Função para mostrar o menu de troca de time
function showTeamSwitchMenu(bot, chatId) {
  bot.sendMessage(
    chatId,
    '🔄 Qual time você gostaria de acompanhar agora?',
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
}

// Função para lidar com a alternância de notificações
async function handleToggleNotifications(bot, chatId, userId, data) {
  const team = data.split('_')[1].toUpperCase();
  
  const userPrefs = await UserPreferences.findOne({ telegramId: userId });
  
  if (!userPrefs) {
    bot.sendMessage(chatId, 'Não foi possível carregar suas configurações. Por favor, envie /start para reiniciar.');
    return;
  }
  
  // Alternar o status da notificação
  userPrefs.notifications[team] = !userPrefs.notifications[team];
  await userPrefs.save();
  
  const newStatus = userPrefs.notifications[team] ? 'ativadas' : 'desativadas';
  bot.sendMessage(chatId, `🔔 Notificações para ${getTeamName(team)} ${newStatus} com sucesso!`);
  
  // Atualizar o menu de configurações
  showSettings(bot, chatId, userId);
}

// Função para lidar com próximos jogos
async function handleUpcomingMatches(bot, chatId, data) {
  const team = data.split('_')[0].toUpperCase();
  bot.sendMessage(chatId, `🔍 Buscando os próximos jogos da FURIA ${getTeamName(team)}...`);
  
  let matches = [];
  
  // Buscar dados de acordo com o time
  switch (team) {
    case 'CS':
      matches = await csData.getUpcomingMatches();
      break;
    case 'VALORANT':
      matches = await valorantData.getUpcomingMatches();
      break;
    case 'LOL':
      matches = await lolData.getUpcomingMatches();
      break;
    case 'R6':
      matches = await r6Data.getUpcomingMatches();
      break;
  }
  
  displayMatches(bot, chatId, matches, team);
}

// Função para lidar com resultados recentes
async function handleRecentResults(bot, chatId, data) {
  const team = data.split('_')[0].toUpperCase();
  bot.sendMessage(chatId, `🔍 Buscando os resultados recentes da FURIA ${getTeamName(team)}...`);
  
  let results = [];
  
  // Buscar dados de acordo com o time
  switch (team) {
    case 'CS':
      results = await csData.getRecentResults();
      break;
    case 'VALORANT':
      results = await valorantData.getRecentResults();
      break;
    case 'LOL':
      results = await lolData.getRecentResults();
      break;
    case 'R6':
      results = await r6Data.getRecentResults();
      break;
  }
  
  displayResults(bot, chatId, results, team);
}

// Função para lidar com estatísticas do time
async function handleTeamStats(bot, chatId, data) {
  const team = data.split('_')[0].toUpperCase();
  bot.sendMessage(chatId, `📊 Buscando estatísticas da FURIA ${getTeamName(team)}...`);
  
  let stats = {};
  
  // Buscar dados de acordo com o time
  switch (team) {
    case 'CS':
      stats = await csData.getTeamStats();
      break;
    case 'VALORANT':
      stats = await valorantData.getTeamStats();
      break;
    case 'LOL':
      stats = await lolData.getTeamStats();
      break;
    case 'R6':
      stats = await r6Data.getTeamStats();
      break;
  }
  
  displayTeamStats(bot, chatId, stats, team);
}

// Função para lidar com lista de jogadores
async function handlePlayersList(bot, chatId, data) {
  const team = data.split('_')[0].toUpperCase();
  showPlayersList(bot, chatId, team);
}

// Função para lidar com informações de jogador
async function handlePlayerInfo(bot, chatId, data) {
  const [teamCode, _, playerNickname] = data.split('_');
  const team = teamCode.toUpperCase();
  
  let getPlayerInfoFunc;
  
  // Selecionar função de acordo com o time
  switch (team) {
    case 'CS':
      getPlayerInfoFunc = csData.getPlayerInfo;
      break;
    case 'VALORANT':
      getPlayerInfoFunc = valorantData.getPlayerInfo;
      break;
    case 'LOL':
      getPlayerInfoFunc = lolData.getPlayerInfo;
      break;
    case 'R6':
      getPlayerInfoFunc = r6Data.getPlayerInfo;
      break;
  }
  
  showPlayerInfo(bot, chatId, playerNickname, team, getPlayerInfoFunc);
}

module.exports = {
  handleCallbackQuery
};