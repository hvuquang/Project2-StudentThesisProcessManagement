const deadlineModel = require("../Models/Deadline.model");
const registerTopicModel = require("../Models/RegisterTopic.model")

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
            const foundRegisterTopics = await registerTopicModel.find({ ma_gv: ma_gv });

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
    },
    done_deadline: async (req, res) => {
        try {
            const { ma_sv, id_deadline } = req.params;
            const registerTopic = await registerTopicModel.findOne({ ma_sv: ma_sv });

            // Lọc các phần tử khác id_deadline và gán lại vào mảng id_deadlines
            const index = registerTopic.id_deadlines.indexOf(id_deadline);
            if (index !== -1) {
                registerTopic.id_deadlines.splice(index, 1);
            }

            // Đẩy id_deadline vào mảng done_deadline
            registerTopic.deadlines_done.push(id_deadline);

            // Lưu thay đổi vào cơ sở dữ liệu
            await registerTopic.save();

            res.status(200).json(registerTopic);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = deadlineController;