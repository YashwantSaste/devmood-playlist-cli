const LocalStrategy = require('passport-local').Strategy;
const bcrypt=require("bcrypt");
const { PasswordUser } = require('../models');

module.exports = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await PasswordUser.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

