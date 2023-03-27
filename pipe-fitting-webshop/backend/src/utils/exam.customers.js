const Customer = require('../models/customer.model');

const findByEmail = (registrationEmail) => Customer.findOne({email: registrationEmail});

const findById = (id) => Customer.findById(id);


module.exports = {
    findByEmail,
    findById
}