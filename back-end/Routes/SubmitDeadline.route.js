const router = require("express").Router();
const submitDeadlineController = require("../Controllers/SubmitDeadline.controller");

router.get("/getSubmitDeadlineById/:_id", submitDeadlineController.getSubmitDeadlineById);

module.exports = router;