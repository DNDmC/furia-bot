// Dados mockados do time de CS

// Função para obter próximos jogos do time de CS
async function getUpcomingMatches() {
    return [
      {
        opponent: 'Complexity',
        event: 'PGL Astana 2025',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Amanhã
        format: 'Bo3'
      },
      {
        opponent: 'Natus Vincere',
        event: 'IEM Dallas 2025',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dias
        format: 'Bo5'
      }
    ];
  }
  
  // Função para obter resultados recentes do time de CS
  async function getRecentResults() {
    return [
      {
        opponent: 'Complexity',
        event: 'PGL Astana 2025 - Qualificatória',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
        won: false,
        mapScore: { furia: 1, opponent: 2 }
      },
      {
        opponent: 'Team Liquid',
        event: 'ESL Pro League Season 22',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
        won: true,
        mapScore: { furia: 2, opponent: 0 }
      }
    ];
  }
  
  // Função para obter estatísticas do time de CS
  async function getTeamStats() {
    return {
      worldRanking: 14,
      wins: 58,
      losses: 42,
      winRate: 58,
      topMaps: [
        { name: 'Anubis', winRate: 68 },
        { name: 'Ancient', winRate: 65 },
        { name: 'Vertigo', winRate: 60 }
      ],
      topPlayer: {
        name: 'KSCERATO',
        rating: 1.21
      }
    };
  }
  
  // Função para obter informações de um jogador de CS
  async function getPlayerInfo(nickname) {
    const players = {
      'fallen': {
        nickname: 'FalleN',
        name: 'Gabriel Toledo',
        age: 34,
        role: 'AWPer / IGL',
        joinDate: 'Janeiro de 2025',
        stats: {
          rating: 1.10,
          kd: 1.15,
          headshots: 35.2,
          mapsPlayed: 48
        },
        config: {
          sensitivity: '1.1',
          dpi: '400',
          resolution: '1280x960 (4:3) Stretched',
          crosshair: 'CSGO-OPWvz-LXxAD-NAWzZ-WCsmG-vkqUO'
        }
      },
      'yuurih': {
        nickname: 'yuurih',
        name: 'Yuri Santos',
        age: 24,
        role: 'Rifler / Lurker',
        joinDate: 'Setembro de 2018',
        stats: {
          rating: 1.18,
          kd: 1.22,
          headshots: 55.1,
          mapsPlayed: 140
        },
        config: {
          sensitivity: '1.75',
          dpi: '400',
          resolution: '1280x960 (4:3) Stretched',
          crosshair: 'CSGO-bM2yZ-yKtBW-TJn2y-jMQZZ-42d3C'
        }
      },
      'kscerato': {
        nickname: 'KSCERATO',
        name: 'Kaike Cerato',
        age: 25,
        role: 'Rifler',
        joinDate: 'Fevereiro de 2019',
        stats: {
          rating: 1.21,
          kd: 1.25,
          headshots: 58.7,
          mapsPlayed: 137
        },
        config: {
          sensitivity: '1.8',
          dpi: '400',
          resolution: '1024x768 (4:3) Stretched',
          crosshair: 'CSGO-dGX8a-LjHMO-4jNmS-8adOY-iQaTP'
        }
      },
      'chelo': {
        nickname: 'chelo',
        name: 'Marcelo Cespedes',
        age: 25,
        role: 'Rifler',
        joinDate: 'Janeiro de 2023',
        stats: {
          rating: 1.09,
          kd: 1.07,
          headshots: 47.8,
          mapsPlayed: 90
        },
        config: {
          sensitivity: '1.65',
          dpi: '400',
          resolution: '1152x864 (4:3) Stretched',
          crosshair: 'CSGO-8FfQ8-z9Rhn-4TScy-LyUhf-tHfTC'
        }
      },
      'yekindar': {
        nickname: 'yekindar',
        name: 'Danil Golubenko',
        age: 25,
        role: 'Entry / Rifler',
        joinDate: 'Abril de 2025',
        stats: {
          rating: 1.15,
          kd: 1.18,
          headshots: 58.3,
          mapsPlayed: 12
        },
        config: {
          sensitivity: '1.9',
          dpi: '400',
          resolution: '1280x960 (4:3) Stretched',
          crosshair: 'CSGO-zDU2k-AwXRS-eKXWs-PtyOe-kUXAD'
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