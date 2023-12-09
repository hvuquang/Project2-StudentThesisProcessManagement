const router = require("express").Router();
const reportController = require("../Controllers/Report.controller");
const upload = require("../MidleWare/upload");

router.post('/addReport/:ma_gv',upload.single('file'),reportController.addReport);
router.put("/done_report/:ma_sv&:id_report",upload.single('file'),reportController.done_report);
router.get("/getMiddleReport",reportController.getMiddleReport);

module.exports = router;