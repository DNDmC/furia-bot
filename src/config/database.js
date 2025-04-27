// Configuração de conexão com o MongoDB

const mongoose = require('mongoose');

// Função para conectar ao MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    throw err;
  }
}

module.exports = {
  connectToDatabase
};