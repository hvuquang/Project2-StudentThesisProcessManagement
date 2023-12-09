const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

const accountRouter = require("./Routes/Account.route");
const topicRouter = require("./Routes/Topic.route");
const registerTopicRouter = require("./Routes/registerTopic.route");
const notificationRouter = require("./Routes/Notification.route")
const deadlineRouter = require("./Routes/Deadline.route");
const reportRouter = require("./Routes/Report.route");

app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"));

mongoose.connect(process.env.MONGODB_CONNECT_URL).then(()=>{
    console.log("Connected MongoDB successfully");
})

app.use('/v1/account',accountRouter);
app.use('/v1/topic', topicRouter);
app.use('/v1/registerTopic',registerTopicRouter);
app.use('/v1/notification', notificationRouter);
app.use('/v1/deadline',deadlineRouter);
app.use('/v1/report',reportRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port "+process.env.PORT);
})
