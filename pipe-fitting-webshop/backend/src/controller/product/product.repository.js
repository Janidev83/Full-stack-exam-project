const Product = require('../../models/product.model');


exports.find = async (volume) => Product.find().skip(volume).limit(6);
