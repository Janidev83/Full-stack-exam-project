const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Missing product name!']
    },
    manufacturer: {
        type: String,
        enum: ['AGRU', 'Georg Fischer', 'Plasson', 'Simona', 'Viniplast'],
        required: [true, 'Missing manufacturer!']
    },
    weldtech: {
        type: String,
        required: [true, 'Missing welding technology!']
    },
    price: {
        type: Number,
        required: [true, 'Missing product price!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Missing image url!']
    }
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('Product', productSchema);