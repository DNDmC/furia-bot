// ARQUIVO: src/data/valorantData.js
// Dados mockados do time de VALORANT

// Função para obter próximos jogos do time de VALORANT
async function getUpcomingMatches() {
    return [
      {
        opponent: 'Sentinels',
        event: 'VCT Americas Stage 1',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
        format: 'Bo3'
      }
    ];
  }
  
  // Função para obter resultados recentes do time de VALORANT
  async function getRecentResults() {
    return [
      {
        opponent: 'Cloud9',
        event: 'VCT Americas Stage 1',
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 dias atrás
        won: true,
        mapScore: { furia: 2, opponent: 1 }
      }
    ];
  }
  
  // Função para obter estatísticas do time de VALORANT
  async function getTeamStats() {
    return {
      worldRanking: 8,
      wins: 42,
      losses: 28,
      winRate: 60,
      topMaps: [
        { name: 'Split', winRate: 70 },
        { name: 'Bind', winRate: 65 },
        { name: 'Ascent', winRate: 58 }
      ],
      topAgents: [
        { name: 'Jett', pickRate: 80 },
        { name: 'Viper', pickRate: 75 },
        { name: 'Killjoy', pickRate: 65 }
      ],
      topPlayer: {
        name: 'mwzera',
        rating: 1.15
      }
    };
  }
  
  // Função para obter informações de um jogador de VALORANT
  async function getPlayerInfo(nickname) {
    const players = {
      'khalil': {
        nickname: 'khalil',
        name: 'Douglas Khalil',
        age: 23,
        role: 'Controller',
        joinDate: 'Janeiro de 2021',
        stats: {
          rating: 1.08,
          kd: 1.05,
          acs: 210,
          mapsPlayed: 98,
          agents: [
            { name: 'Astra', winRate: 70 },
            { name: 'Omen', winRate: 65 },
            { name: 'Viper', winRate: 60 }
          ]
        }
      },
      'nzr': {
        nickname: 'nzr',
        name: 'Jorge Nozawa',
        age: 22,
        role: 'Initiator',
        joinDate: 'Janeiro de 2021',
        stats: {
          rating: 1.15,
          kd: 1.12,
          acs: 225,
          mapsPlayed: 98,
          agents: [
            { name: 'Sova', winRate: 75 },
            { name: 'Fade', winRate: 70 },
            { name: 'KAY/O', winRate: 65 }
          ]
        }
      },
      'mwzera': {
        nickname: 'mwzera',
        name: 'Leonardo Serrati',
        age: 23,
        role: 'Duelist',
        joinDate: 'Outubro de 2022',
        stats: {
          rating: 1.25,
          kd: 1.30,
          acs: 260,
          mapsPlayed: 75,
          agents: [
            { name: 'Raze', winRate: 78 },
            { name: 'Jett', winRate: 75 },
            { name: 'Phoenix', winRate: 65 }
          ]
        }
      },
      'quick': {
        nickname: 'Quick',
        name: 'João Vitor',
        age: 20,
        role: 'Sentinel',
        joinDate: 'Fevereiro de 2023',
        stats: {
          rating: 1.10,
          kd: 1.05,
          acs: 200,
          mapsPlayed: 65,
          agents: [
            { name: 'Killjoy', winRate: 72 },
            { name: 'Chamber', winRate: 68 },
            { name: 'Cypher', winRate: 60 }
          ]
        }
      },
      'pryze': {
        nickname: 'pryze',
        name: 'Luis Henrique',
        age: 21,
        role: 'Flex',
        joinDate: 'Março de 2025',
        stats: {
          rating: 1.12,
          kd: 1.08,
          acs: 220,
          mapsPlayed: 12,
          agents: [
            { name: 'Skye', winRate: 68 },
            { name: 'Harbor', winRate: 65 },
            { name: 'Breach', winRate: 60 }
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