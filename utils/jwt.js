const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/config');

function generateJWT(user){
    return jwt.sign(
        {
            sub : user._id,
            email : user.email,
            authType : user.authType,
        },
        jwtConfig.secret,
        {
            expiresIn : jwtConfig.expiresIn || '1h',
        }
    )
}

module.exports = { generateJWT };