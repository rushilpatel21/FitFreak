const mongoose = require('mongoose');

const waterLogSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    waterDate: {
        type: String,
        required: true,
        match: /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/
    },
    waterQuantity: {
        type: Number,
        required: true
    },
    waterUnit: {
        type: String,
        required: true,
        enum: ['Glass', 'l', 'ml']
    }
});
module.exports = mongoose.model("water logs", waterLogSchema);
 