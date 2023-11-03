const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        required: true
    },
    id_deadlines: {
        type: mongoose.SchemaTypes.ObjectId,
    }
},{timestamps:true})

const account = mongoose.model("Account",accountSchema);
module.exports = account;