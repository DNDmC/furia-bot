// Dados mockados do time de Rainbow Six

// Função para obter próximos jogos do time de R6
async function getUpcomingMatches() {
    return [
      {
        opponent: 'Team BDS',
        event: 'Six Invitational 2025 - Final',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Em 2 dias
        format: 'Bo5'
      },
      {
        opponent: 'DarkZero',
        event: 'Reload 2025',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Em 7 dias
        format: 'Bo3'
      }
    ];
  }
  
  // Função para obter resultados recentes do time de R6
  async function getRecentResults() {
    return [
      {
        opponent: 'FaZe Clan',
        event: 'Six Invitational 2025 - Semifinal',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
        won: true,
        roundScore: { furia: 2, opponent: 0 }
      },
      {
        opponent: 'DarkZero',
        event: 'Six Invitational 2025 - Quartas de Final',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
        won: true,
        roundScore: { furia: 2, opponent: 0 }
      }
    ];
  }
  
  // Função para obter estatísticas do time de R6
  async function getTeamStats() {
    return {
      worldRanking: 1,
      wins: 82,
      losses: 18,
      winRate: 82,
      topMaps: [
        { name: 'Bank', winRate: 85 },
        { name: 'Border', winRate: 75 },
        { name: 'Nighthaven Labs', winRate: 70 }
      ],
      topPlayer: {
        name: 'Kheyze',
        rating: 1.25
      },
      lastEvent: 'Six Invitational 2025 (Finalista)'
    };
  }
  
  // Função para obter informações de um jogador de R6
  async function getPlayerInfo(nickname) {
    const players = {
      'kheyze': {
        nickname: 'Kheyze',
        name: 'Diego Zanello',
        age: 24,
        role: 'Entry Fragger',
        joinDate: 'Março de 2024',
        stats: {
          rating: 1.25,
          kd: 1.30,
          kost: 75.8,
          roundsPlayed: 324,
          openingKD: 1.45,
          operators: [
            { name: 'Flores', winRate: 80 },
            { name: 'Iana', winRate: 75 },
            { name: 'Jäger', winRate: 72 }
          ]
        }
      },
      'herdsz': {
        nickname: 'HerdsZ',
        name: 'Gustavo Herdina',
        age: 24,
        role: 'Support / IGL',
        joinDate: 'Março de 2024',
        stats: {
          rating: 1.15,
          kd: 1.05,
          kost: 82.1,
          roundsPlayed: 324,
          openingKD: 0.92,
          operators: [
            { name: 'Thermite', winRate: 77 },
            { name: 'Smoke', winRate: 74 },
            { name: 'Wamai', winRate: 71 }
          ]
        }
      },
      'felipox': {
        nickname: 'FelipoX',
        name: 'Felipe De Lucia',
        age: 22,
        role: 'Flex',
        joinDate: 'Março de 2024',
        stats: {
          rating: 1.18,
          kd: 1.20,
          kost: 78.5,
          roundsPlayed: 324,
          openingKD: 1.25,
          operators: [
            { name: 'Ace', winRate: 76 },
            { name: 'Mozzie', winRate: 73 },
            { name: 'Sledge', winRate: 70 }
          ]
        }
      },
      'jv92': {
        nickname: 'Jv92',
        name: 'João Vitor',
        age: 23,
        role: 'Flex / Secondary IGL',
        joinDate: 'Março de 2024',
        stats: {
          rating: 1.20,
          kd: 1.18,
          kost: 80.2,
          roundsPlayed: 324,
          openingKD: 1.15,
          operators: [
            { name: 'Hibana', winRate: 78 },
            { name: 'Mute', winRate: 75 },
            { name: 'Valkyrie', winRate: 72 }
          ]
        }
      },
      'nade': {
        nickname: 'nade',
        name: 'Felipe Ferreira',
        age: 22,
        role: 'Hard Support',
        joinDate: 'Março de 2024',
        stats: {
          rating: 1.12,
          kd: 1.02,
          kost: 83.7,
          roundsPlayed: 324,
          openingKD: 0.85,
          operators: [
            { name: 'Thatcher', winRate: 75 },
            { name: 'Kaid', winRate: 72 },
            { name: 'Nomad', winRate: 68 }
          ]
        }
      }
    };
    
    return players[nickname] || null;
  }
  
  module.exports = {
    getUpcomingMatches,
    getRecentResults,
    getTeamStats,
    getPlayerInfo
  };