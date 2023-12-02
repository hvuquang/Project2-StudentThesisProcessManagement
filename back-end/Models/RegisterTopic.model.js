const mongoose = require("mongoose");

const registerTopicSchema = new mongoose.Schema({
    ma_sv: {
        type: mongoose.SchemaTypes.ObjectId,
        required : true,
        ref: "Account"
    },
    id_topic: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Topic"
    },
    topic_name: {
        type: String,
        require: true
    },
    ma_gv : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Account",
        required : true
    },
    id_deadlines : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Deadline",
    }],
    deadlines_done: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Deadline",
    }]
},{timestamps: true});

const registerTopic = mongoose.model("RegisterTopic",registerTopicSchema);
module.exports = registerTopic;