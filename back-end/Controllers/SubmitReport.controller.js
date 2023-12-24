const submitReport = require("../Models/SubmitReport.model");

const submitReportController = {
    getSubmitReportById: async (req, res) => {
        try {
            const { _id } = req.params;
            const submit_report = await submitReport.findById(_id);
            res.status(200).json(submit_report);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = submitReportController;