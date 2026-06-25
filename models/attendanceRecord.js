const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({

    Date: {
        type: Date,
        default: Date.now
    },

    mobile: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
        required: true
    },

    details: {
        type: String,
        ref: 'User'
    },

},{
    timestamps:true
});

module.exports = mongoose.model(
    'Note',
    attendanceSchema
);