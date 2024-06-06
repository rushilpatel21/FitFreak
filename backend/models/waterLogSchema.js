const mongoose = require('mongoose');

const waterLogSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    waterDate: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/
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
},{
    timestamps : true
  });
module.exports = mongoose.model("water logs", waterLogSchema);
 