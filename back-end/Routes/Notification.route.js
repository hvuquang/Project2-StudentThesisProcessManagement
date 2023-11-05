const router = require("express").Router();
const notificationController = require("../Controllers/Notification.controller");
const upload = require("../MidleWare/upload");

router.post("/addNotification", upload.single('file') ,notificationController.addNotification);

module.exports = router;