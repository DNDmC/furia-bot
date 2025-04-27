// Modelo de preferências de usuário no MongoDB

const mongoose = require('mongoose');

// Modelo para preferências do usuário
const userPreferencesSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  defaultTeam: { 
    type: String, 
    enum: ['CS', 'VALORANT', 'LOL', 'R6'], 
    default: 'CS' 
  },
  notifications: {
    CS: { type: Boolean, default: true },
    VALORANT: { type: Boolean, default: true },
    LOL: { type: Boolean, default: true },
    R6: { type: Boolean, default: true }
  }
});

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

module.exports = UserPreferences;