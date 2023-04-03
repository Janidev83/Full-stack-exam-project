const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    refreshToken: {
        type: String,
        required: [true, 'Missing refresh token!']
    }
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('Token', TokenSchema);