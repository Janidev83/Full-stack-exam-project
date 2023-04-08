const Product = require('../../models/product.model');
const DB = require('../../db/db');

exports.find = async (volume) => Product.find().skip(volume).limit(6);

//! Ha jól működik a products, nem keveredik össze, akkor ezeket kivenni és a db.json-t is!
const insertData = async DB => Product.insertMany(DB);
insertData(DB.products);
