const Customer = require('../../models/customer.model');

exports.create = customer => {
    const newCustomer = new Customer(customer);
    return newCustomer.save();
};
