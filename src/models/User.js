// Modelo de usuário no MongoDB

const mongoose = require('mongoose');

// Modelo de usuário
const userSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: String,
  firstName: String,
  lastName: String,
  registeredAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;