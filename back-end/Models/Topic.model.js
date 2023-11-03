const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    topic_name: {
        type: String,
        required: true
    },
    topic_description: {
        type: String,
        required: true
    },
    ma_gv: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Account"
    }
}, { timestamps: true })

const topic = mongoose.model("Topic", topicSchema);
module.exports = topic;