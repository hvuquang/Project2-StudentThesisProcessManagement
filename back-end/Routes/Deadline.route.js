const router = require("express").Router();
const deadlineController = require("../Controllers/Deadline.controller");
const upload = require("../MidleWare/upload");

router.post("/addDeadline/:ma_gv", upload.single('file'), deadlineController.addDeadline);
router.put("/done_deadline/:ma_sv&:id_deadline",upload.single('file') ,deadlineController.done_deadline);
router.get("/allDeadlinesByTeacherId/:teacher_id",deadlineController.getAllDeadlinesByTeacherId);
router.get("/deadlineById/:_id", deadlineController.getDeadlineById);

module.exports = router;