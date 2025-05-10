const mongoose = require('mongoose');
const User = require('./User');

const OAuthUserSchema = new mongoose.Schema({
  oauthProvider: { type: String, required: true },
  oauthId: { type: String, required: true },
});

const OAuthUser = User.discriminator('oauth', OAuthUserSchema);

module.exports = OAuthUser;
