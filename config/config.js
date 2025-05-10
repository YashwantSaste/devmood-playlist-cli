const dotenv = require('dotenv');
const { jwtExpireTime } = require('./constants');
dotenv.config();

const dbConfig = {
    mongoURI: process.env.MONGODB_URI
}

const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: jwtExpireTime
}
module.exports = { dbConfig, jwtConfig };