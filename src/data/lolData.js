// Dados mockados do time de LOL

// Função para obter próximos jogos do time de LOL
async function getUpcomingMatches() {
    return [
      {
        opponent: 'paiN Gaming',
        event: 'LTA South 2025 - Split 1',
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Amanhã
        format: 'Bo1'
      },
      {
        opponent: 'LOUD',
        event: 'LTA South 2025 - Split 1',
        date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 dias
        format: 'Bo1'
      }
    ];
  }
  
  // Função para obter resultados recentes do time de LOL
  async function getRecentResults() {
    return [
      {
        opponent: 'Isurus Estral',
        event: 'LTA South 2025 - Split 1',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
        won: true,
        gameScore: { furia: 2, opponent: 1 } // Bo3
      },
      {
        opponent: 'KaBuM',
        event: 'LTA South 2025 - Split 1',
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 dias atrás
        won: false,
        gameScore: { furia: 0, opponent: 1 } // Bo1
      }
    ];
  }
  
  // Função para obter estatísticas do time de LOL
  async function getTeamStats() {
    return {
      worldRanking: 24,
      wins: 18,
      losses: 22,
      winRate: 45,
      topChampions: [
        { name: 'Renekton', winRate: 75 },
        { name: 'Nautilus', winRate: 70 },
        { name: 'Orianna', winRate: 65 }
      ],
      avgGameDuration: 32.5
    };
  }
  
  // Função para obter informações de um jogador de LOL
  async function getPlayerInfo(nickname) {
    const players = {
      'guigo': {
        nickname: 'Guigo',
        name: 'Guilherme Ruiz',
        age: 23,
        role: 'Top Laner',
        joinDate: 'Janeiro de 2025',
        stats: {
          kda: 3.5,
          csMin: 8.7,
          killParticipation: 65,
          championsPlayed: 10,
          champions: [
            { name: 'Renekton', winRate: 75 },
            { name: 'Gnar', winRate: 70 },
            { name: 'Aatrox', winRate: 65 }
          ]
        }
      },
      'tatu': {
        nickname: 'Tatu',
        name: 'Pedro Seixas',
        age: 20,
        role: 'Jungler',
        joinDate: 'Janeiro de 2025',
        stats: {
          kda: 4.2,
          csMin: 6.5,
          killParticipation: 80,
          championsPlayed: 8,
          champions: [
            { name: 'Jarvan IV', winRate: 80 },
            { name: 'Lee Sin', winRate: 75 },
            { name: 'Viego', winRate: 70 }
          ]
        }
      },
      'tutsz': {
        nickname: 'Tutsz',
        name: 'Arthur Peixoto Machado',
        age: 22,
        role: 'Mid Laner',
        joinDate: 'Maio de 2024',
        stats: {
          kda: 3.8,
          csMin: 9.1,
          killParticipation: 70,
          championsPlayed: 12,
          champions: [
            { name: 'Orianna', winRate: 72 },
            { name: 'Azir', winRate: 68 },
            { name: 'Syndra', winRate: 65 }
          ]
        }
      },
      'ayu': {
        nickname: 'Ayu',
        name: 'Andrey Saraiva',
        age: 21,
        role: 'Bot Laner',
        joinDate: 'Maio de 2024',
        stats: {
          kda: 5.1,
          csMin: 9.4,
          killParticipation: 75,
          championsPlayed: 9,
          champions: [
            { name: 'Jinx', winRate: 85 },
            { name: 'Ezreal', winRate: 75 },
            { name: 'Aphelios', winRate: 70 }
          ]
        }
      },
      'jojo': {
        nickname: 'JoJo',
        name: 'Gabriel Dzelme de Oliveira',
        age: 22,
        role: 'Support',
        joinDate: 'Maio de 2024',
        stats: {
          kda: 5.5,
          csMin: 1.2,
          killParticipation: 85,
          championsPlayed: 10,
          champions: [
            { name: 'Nautilus', winRate: 78 },
            { name: 'Leona', winRate: 75 },
            { name: 'Thresh', winRate: 72 }
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