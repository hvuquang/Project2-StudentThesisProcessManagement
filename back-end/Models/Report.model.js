const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    loai_bao_cao: {
        type: String,
        required: true
    },
    noi_dung: {
        type: String,
        required: true
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
    ma_gv: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
}, { timestamps: true });

const report = mongoose.model('Report', reportSchema);
module.exports = report;