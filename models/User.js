const mongoose = require('mongoose');

const baseOptions = { discriminatorKey: 'authType', collection: 'users' };

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  baseOptions
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
