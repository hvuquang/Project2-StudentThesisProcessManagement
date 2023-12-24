const mongoose = require('mongoose');

const submitReportSchema = new mongoose.Schema({
    loai_bao_cao: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    ma_sv: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Account",
        required: true
    },
    id_report: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Report",
        required: true
    },
}, { timestamps: true });

const submitReport = mongoose.model('SubmitReport', submitReportSchema);
module.exports = submitReport;