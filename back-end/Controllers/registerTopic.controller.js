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
    },
    studentChangeTopic: async(req,res)=>{
        try {
            const { ma_sv, id_new_topic } = req.params;
            const findRegisterTopicByStudentId = await registerTopicModel.findOne({ma_sv: ma_sv});
            findRegisterTopicByStudentId.change_topic = "chờ gv xác nhận";
            findRegisterTopicByStudentId.id_new_topic = id_new_topic;
            await findRegisterTopicByStudentId.save();
            res.status(200).json({"Status":"Success",findRegisterTopicByStudentId});
        } catch (error) {
            res.status(500).json({ "Status": "failed", error });
        }
    },
    teacherConfirmChangeTopicRequest: async(req,res)=>{
        try {
            const { ma_sv } = req.params;
            const findRegisterTopicByStudentId = await registerTopicModel.findOne({ ma_sv: ma_sv });
            findRegisterTopicByStudentId.change_topic = "chờ khoa xác nhận";
            await findRegisterTopicByStudentId.save();
            res.status(200).json({ "Status": "Success", findRegisterTopicByStudentId });
        } catch (error) {
            res.status(500).json({ "Status": "failed", error });
        }
    },
    facultyConfirmChangeTopic: async (req, res) => {
        try {
            const { ma_sv } = req.params;
            const findRegisterTopicByStudentId = await registerTopicModel.findOne({ ma_sv: ma_sv });
            const findNewTopicById = await topicModel.findById(findRegisterTopicByStudentId.id_new_topic);
            const findTopicById = await topicModel.findById(findRegisterTopicByStudentId.id_topic);

            if (!findRegisterTopicByStudentId) {
                return res.status(404).json({ "Status": "failed", "Message": "Student ID not found" });
            }

            findRegisterTopicByStudentId.change_topic = "";
            findRegisterTopicByStudentId.id_topic = findRegisterTopicByStudentId.id_new_topic;
            findRegisterTopicByStudentId.topic_name = findNewTopicById.topic_name;
            findRegisterTopicByStudentId.id_new_topic = undefined;
            findRegisterTopicByStudentId.id_deadlines = [];
            findRegisterTopicByStudentId.deadlines_done = [];
            findRegisterTopicByStudentId.reports = [];
            findRegisterTopicByStudentId.reports_done = [];
            findRegisterTopicByStudentId.submit_reports = [];
            findRegisterTopicByStudentId.submit_deadlines = [];
            findNewTopicById.trang_thai = "Đã đăng ký";
            findTopicById.trang_thai = "Chưa đăng ký";

            await findRegisterTopicByStudentId.save().then(()=>{
                findNewTopicById.save();
                findTopicById.save();
            });

            res.status(200).json({ "Status": "Success", findRegisterTopicByStudentId });
        } catch (error) {
            res.status(500).json({ "Status": "failed", "error": error.message });
        }
    }
};

module.exports = registerTopicController;