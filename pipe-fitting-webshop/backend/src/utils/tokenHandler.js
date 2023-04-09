const Token = require('../models/token.model');
const createError = require('http-errors');

const saveToken = (token) => {
    const tokenError = new Token(token).validateSync();
    if(tokenError) throw new createError.BadRequest('Invalid token');
    
    const newToken = new Token(token);

    return newToken.save();
};

const findToken = (token) => Token.findOne({refreshToken: token}, {_id: 0});

const findIdOfToken = (token) => Token.findOne({refreshToken: token}, {refreshToken: 0});

const removeTokenById = (id) => Token.findByIdAndRemove(id);


module.exports = {
    saveToken,
    findToken,
    findIdOfToken,
    removeTokenById
}