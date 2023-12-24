const submitDeadline = require("../Models/SubmitDeadline.model");

const submitDeadlineController = {
    getSubmitDeadlineById: async (req, res) => {
        try {
            const { _id } = req.params;
            const submit_deadline = await submitDeadline.findById(_id);
            res.status(200).json(submit_deadline);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = submitDeadlineController;