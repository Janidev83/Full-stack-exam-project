const loginRepository = require('../login/login.repository');
const createError = require('http-errors');
const logger = require('../../config/logger');

exports.findByEmail = async (req, res, next) => {
    try {    
        const loginCustomer = await loginRepository.findByEmailPassword(req.body);
        if(!loginCustomer) {
            return next(new createError.NotFound('Incorrect email or password!'));
        }

        logger.info(loginCustomer);
        //! Visszaküldeni a bejelentkezett megfelelő user adatokat, populálva a rendeléseivel??
        res.status(200).json({
            _id: loginCustomer._id,
            lastName: loginCustomer.lastName,
            firstName: loginCustomer.firstName,
            address: loginCustomer.address,
            email: loginCustomer.email,
            accessToken: 'access token'
        });
    } catch(err) {
        next(new createError.InternalServerError('Database error!'));
    }
};