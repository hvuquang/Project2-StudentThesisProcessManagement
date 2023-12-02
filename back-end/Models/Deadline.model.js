const mongoose = require('mongoose');

const deadlineSchema = new mongoose.Schema({
    tieu_de: {
        type: String,
        required: true
    },
    noi_dung: {
        type: String,
        required : true
    },
    ngay_bat_dau: {
        type: String,
        required: true
    },
    ngay_ket_thuc: {
        type: String,
        required: true
    },
    file: {
        type: String,
    },
    ma_gv : {
        type: mongoose.SchemaTypes.ObjectId,
        required : true
    },
}, { timestamps: true });

const deadline = mongoose.model('Deadline', deadlineSchema);
module.exports = deadline;