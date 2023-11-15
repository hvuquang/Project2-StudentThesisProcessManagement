const deadlineModel = require("../Models/Deadline.model");
const registerTopic = require("../Models/RegisterTopic.model")

const deadlineController = {
    addDeadline: async (req, res) => {
        try {
            const { ma_gv } = req.params;

            const newDeadline = new deadlineModel({
                tieu_de: req.body.tieu_de,
                noi_dung: req.body.noi_dung,
                ngay_bat_dau: req.body.ngay_bat_dau,
                ngay_ket_thuc: req.body.ngay_ket_thuc,
                ma_gv: ma_gv
            });
            if(req.file){
                newDeadline.file = req.file.path;
            }

            const savedDeadline = await newDeadline.save();

            // Tìm tất cả registerTopic có ma_gv bằng với ma_gv hiện tại
            const foundRegisterTopics = await registerTopic.find({ ma_gv: ma_gv });

            // Lấy mảng _id của deadlines để thêm vào registerTopic
            const deadlineId = savedDeadline._id;

            // Tạo mảng các promise cho việc cập nhật registerTopic
            const updatePromises = foundRegisterTopics.map(async (topic) => {
                topic.id_deadlines.push(deadlineId);
                await topic.save(); // Không chờ đợi lưu từng topic một
            });

            // Chạy tất cả các promise song song và chờ đợi kết quả
            await Promise.all(updatePromises);

            res.status(201).send(savedDeadline);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = deadlineController;