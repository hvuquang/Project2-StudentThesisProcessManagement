const reportModel = require("../Models/Report.model");
const registerTopicModel = require("../Models/RegisterTopic.model")
const submitReportModel = require("../Models/SubmitReport.model");

const reportController = {
    addReport: async (req, res) => {
        try {
            const { ma_gv } = req.params;

            const newReport = new reportModel({
                loai_bao_cao: req.body.loai_bao_cao,
                noi_dung: req.body.noi_dung,
                ngay_bat_dau: req.body.ngay_bat_dau,
                ngay_ket_thuc: req.body.ngay_ket_thuc,
                ma_gv: ma_gv
            });
            if (req.file) {
                newReport.file = req.file.path;
            }

            const savedReport = await newReport.save();

            // Tìm tất cả registerTopic có ma_gv bằng với ma_gv hiện tại
            const foundRegisterTopics = await registerTopicModel.find({ ma_gv: ma_gv });

            // Lấy mảng _id của deadlines để thêm vào registerTopic
            const reportId = savedReport._id;

            // Tạo mảng các promise cho việc cập nhật registerTopic
            const updatePromises = foundRegisterTopics.map(async (registerTopic) => {
                registerTopic.reports.push(reportId);
                await registerTopic.save(); // Không chờ đợi lưu từng topic một
            });

            // Chạy tất cả các promise song song và chờ đợi kết quả
            await Promise.all(updatePromises);

            res.status(201).send(savedReport);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    done_report: async (req, res) => {
        try {
            const { ma_sv, id_report } = req.params;
            const registerTopic = await registerTopicModel.findOne({ ma_sv: ma_sv });

            const index = registerTopic.reports.indexOf(id_report);
            if (index !== -1) {
                registerTopic.reports.splice(index, 1);
            }

            const newSubmitReport = new submitReportModel({
                loai_bao_cao: req.body.loai_bao_cao,
                ma_sv: ma_sv
            })

            if(req.file){
                newSubmitReport.file = req.file.path;
            }

            registerTopic.reports_done.push(id_report);
            registerTopic.submit_reports.push(newSubmitReport._id);
            
            await newSubmitReport.save();
            await registerTopic.save();

            res.status(200).json(registerTopic);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // getSubmitMiddleReport: async (req, res) => {
    //     try {
    //         const middleReports = await registerTopicModel
    //             .find({ submit_reports: { $exists: true, $ne: [] } })
    //             .populate({
    //                 path: 'submit_reports',
    //                 populate: {
    //                     path: 'ma_sv'
    //                 },
    //             });

    //         res.status(200).json(middleReports);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
    getSubmitReport: async (req, res) => {
        try {
            const page = req.params.page; // Trang được yêu cầu (mặc định là trang 1)
            const perPage = 6; // Số tài khoản mỗi trang

            const middleReports = await registerTopicModel
                .find({ submit_reports: { $exists: true, $ne: [] } })
                .populate({
                    path: 'submit_reports',
                    populate: {
                        path: 'ma_sv'
                    },
                }).skip((page - 1) * perPage) // Bỏ qua các tài khoản đã lấy trước đó
                .limit(perPage); // Giới hạn số lượng tài khoản được trả về

            res.status(200).json(middleReports);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    pageNumber: async (req, res) => {
        try {
            const countSubmitMiddleReport = await registerTopicModel
                .find({ submit_reports: { $exists: true, $ne: [] } })
                .populate({
                    path: 'submit_reports',
                    populate: {
                        path: 'ma_sv'
                    },
                }).countDocuments();
            const pageNumber = Math.ceil(countSubmitMiddleReport / 6);
            res.status(200).json(pageNumber)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getReportById: async(req,res)=>{
        try {
            const { _id } = req.params;
            const report = await reportModel.findById(_id);
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = reportController;