const router = require("express").Router();
const submitReportController = require("../Controllers/SubmitReport.controller");

router.get("/getSubmitReportById/:_id", submitReportController.getSubmitReportById);

module.exports = router;