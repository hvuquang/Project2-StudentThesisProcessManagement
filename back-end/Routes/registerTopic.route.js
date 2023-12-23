const router = require("express").Router();
const registerTopicController = require("../Controllers/registerTopic.controller");

router.post("/registerTopic/:ma_sv&:id_topic",registerTopicController.registerTopic);
router.get('/getAllRegisterTopic',registerTopicController.getAllRegisterTopic);
router.get('/searchRegisterTopic', registerTopicController.getRegisterTopic);
router.put("/changeTopic/:ma_sv&:id_new_topic", registerTopicController.studentChangeTopic);
router.put("/teacherConfirmChangeTopic/:ma_sv", registerTopicController.teacherConfirmChangeTopicRequest);
router.put("/facultyConfirmChangeTopic/:ma_sv", registerTopicController.facultyConfirmChangeTopic);

module.exports = router;