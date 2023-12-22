const mongoose = require('mongoose');

const submitDeadlineSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true
    },
    ma_sv: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Account",
        required: true
    },
}, { timestamps: true });

const submitDeadline = mongoose.model('SubmitDeadline', submitDeadlineSchema);
module.exports = submitDeadline;