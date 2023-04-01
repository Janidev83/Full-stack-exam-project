const createError = require('http-errors');
const logger = require('../config/logger');
const jwt = require('jsonwebtoken');
const { findByEmailPassword } = require('../utils/exam.customers');


// login
exports.login = async (req, res, next) => {
    if(!req.body.email || ! req.body.password) {
        return next(new createError.BadRequest('Missing email or password!'));
    }

    try {
        const user = await findByEmailPassword(req.body);
        if(!user) {
            return next(new createError.NotFound('Invalid email or password!'));
        }

        const accessToken = jwt.sign({
            _id: user._id,
            lastName: user.lastName,
            firstName: user.firstName,
            address: user.address,
            email: user.email,
            orders: user.orders
        }, process.env.ACCESS_TOKEN_SECRET_KEY);

        logger.info('Customer successfully logged in!');
        res.status(200).json({accessToken, customer: {
            _id: user._id,
            lastName: user.lastName,
            firstName: user.firstName,
            address: user.address,
            email: user.email,
            orders: user.orders
        }});

    } catch(err) {
        next(new createError.InternalServerError('Database error!'));
    }


};