const notificationModel = require("../Models/Notification.model");

const notificationController = {
    addNotification: async(req,res)=>{
        try {
            const newNotification = new notificationModel({
                tieu_de: req.body.tieu_de,
                noi_dung: req.body.noi_dung 
            });
            if(req.file){
                newNotification.file = req.file.path;
            }
            await newNotification.save();
            res.status(201).send(newNotification);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getAllNotifications: async(req,res)=>{
        try {
            const allNotifications = await notificationModel.find({})
            res.status(200).json(allNotifications);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateNotification: async (req, res) => {
        try {
            const {_id} = req.params;
            const allNotifications = await notificationModel.findByIdAndUpdate(_id,req.body,{new:true});
            res.status(200).json(allNotifications);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = notificationController;