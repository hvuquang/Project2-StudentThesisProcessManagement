const topicModel = require("../Models/Topic.model");
const accountModel = require("../Models/Account.model");

const topicController = {
    addTopic: async(req,res)=>{
        try {
            const ma_gv = req.params._id;
            const teacher = await accountModel.findById(ma_gv);

            if (teacher.account_type === "gv") {
                const newTopic = {
                    topic_name: req.body.topic_name,
                    topic_description: req.body.topic_description,
                    ma_gv: teacher._id
                };

                const topic = new topicModel(newTopic);
                await topic.save();

                res.status(201).json(topic);
            } else {
                res.status(400).json("Add update unsuccessfully");
            }
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getAllTopic: async(req,res)=>{
        try {
            const allTopic = await topicModel.find({}).populate({path:"ma_gv",select:"fullname email phone_number -_id"});
            res.status(200).json(allTopic);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getASingleTopic: async(req,res)=>{
        try {
            const id_topic = req.params._id;
            const topic = await topicModel.findById(id_topic);
            res.status(200).json(topic);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateTopic: async (req, res) => {
        try {
            const id_topic = req.params._id;
            const updateTopic = req.body;
            const newTopic = await topicModel.findByIdAndUpdate(id_topic, updateTopic, { new: true });
            res.status(200).json(newTopic);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    deleteTopic: async (req, res) => {
        try {
            const id_topic = req.params._id;
            await topicModel.findByIdAndDelete(id_topic);
            res.status(200).json("Deleted account successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchTopic: async(req,res)=>{
        try {
            const search_string = req.body.search_string;
            const topics = await topicModel.find({ topic_name: { $regex: search_string.trim(), $options: 'i' } });
            res.status(200).json(topics);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = topicController;