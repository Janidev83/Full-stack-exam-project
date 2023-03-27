const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'Missing number of order!']
    },
    date: {
        type: Date,
        required: [true, 'Missing date of order!']
    },
    deliveryAddress: {
        type: String,
        required: [true, 'Missing delivery address!']
    },
    paidAmount: {
        type: Number,
        required: [true, 'Missing paid amount!']
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Missing customer id!'],
        ref: 'Customer'
    }
}, {timestamps: true, versionKey: false});


module.exports = mongoose.model('Order', OrderSchema);