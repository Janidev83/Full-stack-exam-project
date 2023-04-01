const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return next(new createError.Unauthorized('Not authorized user request!'));
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, payLoad) => {
        if(err) {
            return next(new createError.Forbidden('Invalid or expired access token!'));
        }

        req.customer = payLoad;

        next();
    });
};