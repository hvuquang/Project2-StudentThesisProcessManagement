const router = require("express").Router();
const deadlineController = require("../Controllers/Deadline.controller");
const upload = require("../MidleWare/upload");

router.post("/addDeadline/:ma_gv", upload.single('file'), deadlineController.addDeadline);

module.exports = router;