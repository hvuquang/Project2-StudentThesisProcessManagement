const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
        // cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (true) {
            callback(null, true);
        } else {
            console.log(file.mimetype);
            console.log("Only jpg & png file supported!");
            callback(null, false);
        }
    },
    limits: {
        fieldSize: 1024 * 1024 * 2,
    },
});

module.exports = upload;