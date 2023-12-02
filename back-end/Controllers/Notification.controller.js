const notificationModel = require("../Models/Notification.model");

const notificationController = {
    addNotification: async(req,res)=>{
        try {
            const { filename, path } = req.file;
            const newNotification = new notificationModel({
                tieu_de: req.body.tieu_de,
                file: path, 
            });
            await newNotification.save();
            res.status(201).send(newNotification);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = notificationController;