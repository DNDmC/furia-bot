// Funções utilitárias

// Função para obter o nome completo do time
function getTeamName(teamCode) {
    const teamNames = {
      'CS': 'Counter-Strike',
      'VALORANT': 'VALORANT',
      'LOL': 'League of Legends',
      'R6': 'Rainbow Six Siege'
    };
    
    return teamNames[teamCode] || teamCode;
  }
  
  // Exportar funções
  module.exports = {
    getTeamName
  };