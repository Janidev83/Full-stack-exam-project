const productRepository = require('../product/product.repository');
const createError = require('http-errors');
const logger = require('../../config/logger');

exports.find = async (req, res, next) => {
    const skipVolume = parseInt(req.query.volume);
    //! http://localhost:3000/product/?volume=6 ---> tesztekhez, ha kell (pl.: 6), hibához pl.: > 48
    try {
        const products = await productRepository.find(skipVolume);
        logger.info(products);
        if(products.length === 0) {
            return next(new createError.NotFound('No more products found in database!'));
        }
        res.status(200).json(products);
    } catch(err) {
        logger.error(err);
        next(new createError.InternalServerError('Database Error!'));
    }
};