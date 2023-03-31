const Customer = require('../models/customer.model');

const findByEmail = (registrationEmail) => Customer.findOne({email: registrationEmail});

const findByEmailPassword = (loginData) => Customer.findOne({$and: [{email: loginData.email}, {password: loginData.password}]});

const findById = (id) => Customer.findById(id);


module.exports = {
    findByEmail,
    findById,
    findByEmailPassword
}