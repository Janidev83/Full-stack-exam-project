const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const customerSchema = mongoose.Schema({
    lastName: {
        type: String,
        required: [true, 'Missing lastname!']
    },
    firstName: {
        type: String,
        required: [true, 'Missing firstName!']
    },
    address: {
        type: String,
        required: [true, 'Missing delivery address!']
    },
    email: {
        type: String,
        required: [true, 'Missing email!']
    },
    password: {
        type: String,
        required: [true, 'Missing password!']
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
}, {timestamps: true, versionKey: false});

customerSchema.plugin(idValidator);
module.exports = mongoose.model('Customer', customerSchema);