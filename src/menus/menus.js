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
}

  // Função para exibir partidas
function displayMatches(bot, chatId, matches, team) {
    if (matches.length === 0) {
      bot.sendMessage(chatId, 'Não há jogos agendados no momento. Fique ligado(a) para atualizações!');
      return;
    }
    
    const teamName = getTeamName(team);
    let messageText = `🗓️ *PRÓXIMOS JOGOS DA FURIA ${teamName}*\n\n`;
    
    matches.forEach((match, index) => {
      // Formatar a data do jogo para o fuso horário do Brasil
      const matchDate = new Date(match.date);
      const dateOptions = { 
        day: '2-digit', 
        month: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
      };
      const localDate = matchDate.toLocaleString('pt-BR', dateOptions);
      
      messageText += `*${index + 1}.* FURIA vs ${match.opponent}\n`;
      messageText += `📅 ${localDate} (Horário de Brasília)\n`;
      messageText += `🏆 ${match.event}\n`;
      messageText += `🎮 Formato: ${match.format}\n\n`;
    });
    
    messageText += 'Quer receber notificações antes dos jogos? Use o menu de configurações.';
    
    bot.sendMessage(chatId, messageText, { 
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🔙 Voltar', callback_data: 'main_menu' }
          ]
        ]
      }
    });
  }
  
  // Função para exibir resultados
  function displayResults(bot, chatId, results, team) {
    if (results.length === 0) {
      bot.sendMessage(chatId, 'Não consegui encontrar resultados recentes. Tente novamente mais tarde.');
      return;
    }
    
    const teamName = getTeamName(team);
    let messageText = `📊 *RESULTADOS RECENTES DA FURIA ${teamName}*\n\n`;
    
    results.forEach((result, index) => {
      const matchDate = new Date(result.date);
      const dateOptions = { 
        day: '2-digit', 
        month: '2-digit',
        timeZone: 'America/Sao_Paulo'
      };
      const localDate = matchDate.toLocaleString('pt-BR', dateOptions);
      
      const matchResult = result.won ? '✅ Vitória' : '❌ Derrota';
      let score = '';
      
      // Formato de pontuação dependendo do jogo
      if (team === 'CS' || team === 'VALORANT') {
        score = `${result.mapScore.furia} - ${result.mapScore.opponent}`;
      } else if (team === 'R6') {
        score = `${result.roundScore.furia} - ${result.roundScore.opponent}`;
      } else if (team === 'LOL') {
        score = `${result.gameScore.furia} - ${result.gameScore.opponent}`;
      }
      
      messageText += `*${index + 1}.* FURIA vs ${result.opponent}\n`;
      messageText += `📅 ${localDate}\n`;
      messageText += `${matchResult} (${score})\n`;
      messageText += `🏆 ${result.event}\n\n`;
    });
    
    bot.sendMessage(chatId, messageText, { 
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🔙 Voltar', callback_data: 'main_menu' }
          ]
        ]
      }
    });
  }
  
  // Função para exibir estatísticas do time
  function displayTeamStats(bot, chatId, stats, team) {
    const teamName = getTeamName(team);
    let messageText = `📈 *ESTATÍSTICAS DA FURIA ${teamName}*\n\n`;
    
    // Estatísticas básicas para todos os jogos
    messageText += `Ranking Mundial: #${stats.worldRanking}\n`;
    messageText += `Vitórias/Derrotas: ${stats.wins}/${stats.losses} (${stats.winRate}%)\n`;
    
    // Estatísticas específicas por jogo
    switch(team) {
      case 'CS':
        messageText += `\nMapas Mais Jogados:\n`;
        stats.topMaps.forEach((map) => {
          messageText += `- ${map.name}: ${map.winRate}% de vitórias\n`;
        });
        messageText += `\nJogador Destaque: ${stats.topPlayer.name} (Rating ${stats.topPlayer.rating})`;
        break;
      
      case 'VALORANT':
        messageText += `\nMapas Mais Jogados:\n`;
        stats.topMaps.forEach((map) => {
          messageText += `- ${map.name}: ${map.winRate}% de vitórias\n`;
        });
        messageText += `\nAgentes Mais Usados:\n`;
        stats.topAgents.forEach((agent) => {
          messageText += `- ${agent.name}: ${agent.pickRate}% de escolha\n`;
        });
        break;
      
      case 'LOL':
        messageText += `\nCampeões Mais Jogados:\n`;
        stats.topChampions.forEach((champ) => {
          messageText += `- ${champ.name}: ${champ.winRate}% de vitórias\n`;
        });
        messageText += `\nTempo Médio de Jogo: ${stats.avgGameDuration} minutos`;
        break;
      
      case 'R6':
        messageText += `\nMapas Mais Jogados:\n`;
        stats.topMaps.forEach((map) => {
          messageText += `- ${map.name}: ${map.winRate}% de vitórias\n`;
        });
        messageText += `\nJogador Destaque: ${stats.topPlayer.name} (Rating ${stats.topPlayer.rating})`;
        messageText += `\nEvento mais recente: ${stats.lastEvent}`;
        break;
    }
    
    bot.sendMessage(chatId, messageText, { 
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🔙 Voltar', callback_data: 'main_menu' }
          ]
        ]
      }
    });
  }
  
  // Função para mostrar informações de um jogador
  async function showPlayerInfo(bot, chatId, nickname, team, getPlayerInfoFunction) {
    try {
      const playerInfo = await getPlayerInfoFunction(nickname);
      
      if (!playerInfo) {
        bot.sendMessage(chatId, 'Informações do jogador não encontradas.');
        return;
      }
      
      let messageText = `👤 *${playerInfo.nickname.toUpperCase()}*\n\n`;
      messageText += `Nome: ${playerInfo.name}\n`;
      messageText += `Idade: ${playerInfo.age} anos\n`;
      messageText += `Função: ${playerInfo.role}\n`;
      messageText += `Na FURIA desde: ${playerInfo.joinDate}\n\n`;
      
      // Informações específicas por jogo
      switch(team) {
        case 'CS':
          messageText += `📊 *ESTATÍSTICAS (2025)*\n`;
          messageText += `Rating: ${playerInfo.stats.rating}\n`;
          messageText += `K/D: ${playerInfo.stats.kd}\n`;
          messageText += `HS%: ${playerInfo.stats.headshots}%\n`;
          messageText += `Maps Jogados: ${playerInfo.stats.mapsPlayed}\n\n`;
          messageText += `🖱️ *CONFIGURAÇÃO*\n`;
          messageText += `Sensibilidade: ${playerInfo.config.sensitivity}\n`;
          messageText += `DPI: ${playerInfo.config.dpi}\n`;
          messageText += `Resolution: ${playerInfo.config.resolution}\n`;
          messageText += `Crosshair: ${playerInfo.config.crosshair}\n`;
          break;
        
        case 'VALORANT':
          messageText += `📊 *ESTATÍSTICAS (2025)*\n`;
          messageText += `Rating: ${playerInfo.stats.rating}\n`;
          messageText += `K/D: ${playerInfo.stats.kd}\n`;
          messageText += `ACS: ${playerInfo.stats.acs}\n`;
          messageText += `Mapas Jogados: ${playerInfo.stats.mapsPlayed}\n\n`;
          messageText += `🎯 *AGENTES MAIS JOGADOS*\n`;
          playerInfo.stats.agents.forEach(agent => {
            messageText += `- ${agent.name}: ${agent.winRate}% de vitórias\n`;
          });
          break;
        
        case 'LOL':
          messageText += `📊 *ESTATÍSTICAS (2025)*\n`;
          messageText += `KDA: ${playerInfo.stats.kda}\n`;
          messageText += `CS/min: ${playerInfo.stats.csMin}\n`;
          messageText += `Taxa de Participação: ${playerInfo.stats.killParticipation}%\n`;
          messageText += `Campeões Jogados: ${playerInfo.stats.championsPlayed}\n\n`;
          messageText += `🎮 *CAMPEÕES MAIS JOGADOS*\n`;
          playerInfo.stats.champions.forEach(champion => {
            messageText += `- ${champion.name}: ${champion.winRate}% de vitórias\n`;
          });
          break;
        
        case 'R6':
          messageText += `📊 *ESTATÍSTICAS (2025)*\n`;
          messageText += `Rating: ${playerInfo.stats.rating}\n`;
          messageText += `K/D: ${playerInfo.stats.kd}\n`;
          messageText += `KOST: ${playerInfo.stats.kost}%\n`;
          messageText += `Rounds Jogados: ${playerInfo.stats.roundsPlayed}\n`;
          messageText += `Abertura: ${playerInfo.stats.openingKD} K/D em aberturas\n\n`;
          messageText += `🎮 *OPERADORES MAIS JOGADOS*\n`;
          playerInfo.stats.operators.forEach(op => {
            messageText += `- ${op.name}: ${op.winRate}% de vitórias\n`;
          });
          break;
      }
      
      // Adicionar botões de acordo com o time
      const prefix = team.toLowerCase();
      bot.sendMessage(chatId, messageText, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🎮 Ver Jogos Recentes', callback_data: `${prefix}_player_matches_${nickname}` },
              { text: '📊 Estatísticas Completas', callback_data: `${prefix}_player_fullstats_${nickname}` }
            ],
            [
              { text: '🔙 Voltar', callback_data: `${prefix}_players` }
            ]
          ]
        }
      });
    } catch (error) {
      console.error(`Erro ao buscar informações do jogador ${nickname}:`, error);
      bot.sendMessage(chatId, 'Ocorreu um erro ao buscar informações do jogador. Tente novamente mais tarde.');
    }
  }
  
module.exports = {
  showMainMenu,
  showAllTeamsMenu, 
  showSettings,
  showPlayersList,
  displayMatches,
  displayResults,
  displayTeamStats,
  showPlayerInfo
};