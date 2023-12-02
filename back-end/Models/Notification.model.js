const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    tieu_de: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    }
},{timestamps:true});

const notification = mongoose.model('Notification', notificationSchema);
module.exports = notification;