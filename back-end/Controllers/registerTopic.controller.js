const registerTopicModel = require("../Models/RegisterTopic.model");
const accountModel = require("../Models/Account.model");
const topicModel = require("../Models/Topic.model");

const registerTopicController = {
    registerTopic: async(req,res)=>{
        const ma_sv = req.params.ma_sv;
        const id_topic = req.params.id_topic;
        const topic = await topicModel.findById(id_topic);
        try {
                const registerTopic = new registerTopicModel({
                    ma_sv: ma_sv,
                    id_topic: id_topic,
                    topic_name: topic.topic_name,
                    ma_gv : topic.ma_gv,
                });
                topic.trang_thai = "Đã đăng ký";
                await registerTopic.save().then(()=>topic.save());
                res.status(200).json(registerTopic);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    getAllRegisterTopic: async(req,res)=>{
        try {
            const allRegisterTopic = await registerTopicModel.find({}).populate(
                {
                    path: "ma_sv",
                    select: "fullname email phone"
                }
            )
            res.status(200).json(allRegisterTopic);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getRegisterTopic: async(req,res)=>{
        try {
            const search_string = req.body.search_string;
            const topics = await registerTopicModel.find({topic_name: {$regex : search_string.trim() , $options : 'i'}}).populate({
                path: "ma_sv",
                select: "fullname email phone"
            });
            res.status(200).json(topics);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = registerTopicController;