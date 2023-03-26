const Customer = require('../../models/customer.model');

exports.update = (id, updateData) => Customer.findByIdAndUpdate(id, updateData, {new: true});
