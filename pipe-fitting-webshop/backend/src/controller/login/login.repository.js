const Customer = require('../../models/customer.model');

exports.findByEmailPassword = (loginData) => Customer.findOne({$and: [{email: loginData.email}, {password: loginData.password}]});