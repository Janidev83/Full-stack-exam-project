const Customer = require('../../models/customer.model');

exports.update = (id, updateData) => Customer.findByIdAndUpdate(id, updateData, {new: true});

exports.findByEmail = (registrationEmail) => Customer.findOne({email: registrationEmail});

exports.findByEmailPassword = (loginData) => Customer.findOne({$and: [{email: loginData.email}, {password: loginData.password}]});

exports.findById = (id) => Customer.findById(id);
