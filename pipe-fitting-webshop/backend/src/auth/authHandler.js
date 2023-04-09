const createError = require('http-errors');
const logger = require('../config/logger');
const jwt = require('jsonwebtoken');
const { findByEmailPassword } = require('../controller/customer/customer.repository');
const { saveToken, findToken, findIdOfToken, removeTokenById } = require('../utils/exam.token');


exports.login = async (req, res, next) => {
    if(!req.body.email || ! req.body.password) {
        return next(new createError.BadRequest('Missing email or password'));
    }
    try {
        const user = await findByEmailPassword(req.body);
        if(!user) {
            return next(new createError.NotFound('Invalid email or password'));
        }
        
        const accessToken = jwt.sign({
            _id: user._id,
            lastName: user.lastName,
            firstName: user.firstName,
            address: user.address,
            email: user.email,
            orders: user.orders
        }, process.env.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });
        
        const refreshToken = jwt.sign({
            _id: user._id,
            lastName: user.lastName,
            firstName: user.firstName,
            address: user.address,
            email: user.email,
            orders: user.orders
        }, process.env.REFRESH_TOKEN_SECRET_KEY);
        
        await saveToken({refreshToken});

        logger.info('Customer successfully logged in!');
        res.status(200).json({accessToken, customer: {
            _id: user._id,
            lastName: user.lastName,
            firstName: user.firstName,
            address: user.address,
            email: user.email,
            orders: user.orders
        }, refreshToken});

    } catch(err) {
        if(err.message === 'Invalid token') {
            return next(new createError.BadRequest('Server error'));
        }
        next(new createError.InternalServerError('Database error!'));
    }
};

exports.refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.body;
        if(!refreshToken) {
            return next(new createError.Unauthorized('Unauthorized request'));
        }

        const foundToken = await findToken(refreshToken);
        if(!foundToken) throw new createError.Forbidden();

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, payLoad) => {
            if(err) throw new createError.Forbidden();

            const accessToken = jwt.sign({
                _id: payLoad._id,
                lastName: payLoad.lastName,
                firstName: payLoad.firstName,
                address: payLoad.address,
                email: payLoad.email,
                orders: payLoad.orders
            }, process.env.ACCESS_TOKEN_SECRET_KEY, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            });

            res.status(200).json({accessToken});
        })
    } catch(err) {
        if(err.statusCode === 403) {
            return next(new createError.Forbidden('Forbidden request'));
        }
        next(new createError.InternalServerError('Database error!'));
    }
};

exports.logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.body;
        if(!refreshToken) {
            return next(new createError.Unauthorized('Unauthorized request'));
        }

        const tokenId = await findIdOfToken(refreshToken);
        if(!tokenId) {
            return next(new createError.Forbidden('Forbidden request'));
        }

        await removeTokenById(tokenId._id.toString());
        res.status(200).json({});
    } catch(err) {
        next(new createError.InternalServerError('Database error!'));
    }
};