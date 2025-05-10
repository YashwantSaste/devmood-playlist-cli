const { connectToDatabase } = require('./utils/database.js'); // Import the database connection function


const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const localStrategy = require('./passport/PasswordStatergy.js');
const authRoutes = require('./routes/auth');

dotenv.config();

//connectToDatabase();
const app = express();

passport.use(localStrategy);

app.use(express.json());
app.use(passport.initialize());

connectToDatabase();

app.use('/auth', authRoutes);
const PORT = process.env.PORT || 3000;
try{
    app.listen(PORT, () => console.log(`🚀 Auth server running on port ${PORT}`));
}
catch(err){
    console.error('❌ Failed to start server:', err);
    process.exit(1);
}
