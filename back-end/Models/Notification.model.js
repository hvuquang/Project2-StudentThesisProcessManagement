const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    tieu_de: {
        type: String,
        required: true
    },
    noi_dung: {
        type: String,
        required: true
    },
    file: {
        type: String
    }
},{timestamps:true});

const notification = mongoose.model('Notification', notificationSchema);
module.exports = notification;