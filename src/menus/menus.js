// Funções para exibição de menus do bot

const { getTeamName } = require('../utils/helpers');
const UserPreferences = require('../models/Preferences');

// Função para mostrar o menu principal
async function showMainMenu(bot, chatId, team) {
  const teamName = getTeamName(team);
  const prefix = team.toLowerCase();
  
  bot.sendMessage(
    chatId,
    `🔥 *MENU PRINCIPAL - FURIA ${teamName}*\n\nO que você gostaria de ver?`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🗓️ Próximos Jogos', callback_data: `${prefix}_upcoming_matches` },
            { text: '📊 Últimos Resultados', callback_data: `${prefix}_recent_results` }
          ],
          [
            { text: '👥 Jogadores', callback_data: `${prefix}_players` },
            { text: '📈 Estatísticas', callback_data: `${prefix}_stats` }
          ],
          [
            { text: '🏆 Torneios', callback_data: `${prefix}_tournaments` },
            { text: '⚙️ Configurações', callback_data: 'settings' }
          ],
          [
            { text: '🔄 Trocar de Time', callback_data: 'switch_team' }
          ]
        ]
      }
    }
  );
}

// Função para mostrar o menu de todos os times
function showAllTeamsMenu(bot, chatId) {
  bot.sendMessage(
    chatId,
    `🔥 *MENU PRINCIPAL - FURIA ESPORTS*\n\nEscolha um time para ver informações:`,
    {
      parse_mode: 'Markdown',
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
            { text: '⚙️ Configurações', callback_data: 'settings' }
          ]
        ]
      }
    }
  );
}

// Função para mostrar as configurações
async function showSettings(bot, chatId, userId) {
  try {
    const userPrefs = await UserPreferences.findOne({ telegramId: userId });
    
    if (!userPrefs) {
      bot.sendMessage(chatId, 'Não foi possível carregar suas configurações. Por favor, envie /start para reiniciar.');
      return;
    }
    
    let messageText = `⚙️ *CONFIGURAÇÕES*\n\n`;
    messageText += `Time padrão: ${getTeamName(userPrefs.defaultTeam)}\n\n`;
    messageText += `*Status das Notificações:*\n`;
    
    // Listar status de notificações para cada time
    Object.keys(userPrefs.notifications).forEach(team => {
      const status = userPrefs.notifications[team] ? '🔔 Ativas' : '🔕 Inativas';
      messageText += `- ${getTeamName(team)}: ${status}\n`;
    });
    
    bot.sendMessage(chatId, messageText, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'CS 🔔', callback_data: 'toggle_cs_notifications' },
            { text: 'VALORANT 🔔', callback_data: 'toggle_valorant_notifications' }
          ],
          [
            { text: 'LOL 🔔', callback_data: 'toggle_lol_notifications' },
            { text: 'R6 🔔', callback_data: 'toggle_r6_notifications' }
          ],
          [
            { text: '🔄 Trocar Time Padrão', callback_data: 'switch_team' }
          ],
          [
            { text: '🔙 Voltar ao Menu Principal', callback_data: 'main_menu' }
          ]
        ]
      }
    });
  } catch (error) {
    console.error('Erro ao carregar configurações:', error);
    bot.sendMessage(chatId, 'Ocorreu um erro ao carregar suas configurações. Tente novamente mais tarde.');
  }
}

// Função para mostrar a lista de jogadores
function showPlayersList(bot, chatId, team) {
  let players = [];
  let title = '';
  
  switch(team) {
    case 'CS':
      title = 'CS';
      players = [
        ['FalleN', 'yuurih'],
        ['KSCERATO', 'chelo'],
        ['yekindar']
      ];
      break;
    case 'VALORANT':
      title = 'VALORANT';
      players = [
        ['khalil', 'nzr'],
        ['mwzera', 'Quick'],
        ['pryze']
      ];
      break;
    case 'LOL':
      title = 'League of Legends';
      players = [
        ['Guigo', 'Tatu'],
        ['Tutsz', 'Ayu'],
        ['JoJo']
      ];
      break;
    case 'R6':
      title = 'Rainbow Six Siege';
      players = [
        ['Kheyze', 'HerdsZ'],
        ['FelipoX', 'Jv92'],
        ['nade']
      ];
      break;
    default:
      bot.sendMessage(chatId, 'Time não encontrado.');
      return;
  }
  
  // Construir teclado com jogadores
  let keyboard = [];
  
  // Adicionar cada linha de jogadores
  players.forEach(row => {
    const keyboardRow = row.map(player => ({
      text: player,
      callback_data: `${team.toLowerCase()}_player_${player.toLowerCase()}`
    }));
    keyboard.push(keyboardRow);
  });
  
  // Adicionar botão de voltar
  keyboard.push([{ text: '🔙 Voltar', callback_data: 'main_menu' }]);
  
  bot.sendMessage(
    chatId,
    `👥 *JOGADORES DA FURIA ${title}*\n\nSelecione um jogador para ver informações:`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: keyboard
      }
    }
  );