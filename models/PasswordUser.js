const mongoose = require('mongoose');
const User = require('./User');

const PasswordUserSchema = new mongoose.Schema({
  passwordHash: { type: String, required: true },
});

const PasswordUser = User.discriminator('password', PasswordUserSchema);

module.exports = PasswordUser;
