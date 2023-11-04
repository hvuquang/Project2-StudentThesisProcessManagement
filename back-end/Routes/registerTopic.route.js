const router = require("express").Router();
const registerTopicController = require("../Controllers/registerTopic.controller");

router.post("/registerTopic/:ma_sv&:id_topic",registerTopicController.registerTopic);
router.get('/getAllRegisterTopic',registerTopicController.getAllRegisterTopic);
router.get('/searchRegisterTopic', registerTopicController.getRegisterTopic);

module.exports = router;