const router = require("express").Router();
const topicController = require("../Controllers/Topic.controller");

router.post('/addTopic/:_id', topicController.addTopic);
router.get('/getAllTopic', topicController.getAllTopic);
router.get('/getASingleTopic/:_id', topicController.getASingleTopic);
router.put('/updateTopic/:_id', topicController.updateTopic);
router.put('/deleteTopic/:_id', topicController.deleteTopic);

module.exports = router;
