const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

const accountRouter = require("./Routes/Account.route");
const topicRouter = require("./Routes/Topic.route");
const registerTopicRouter = require("./Routes/registerTopic.route");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECT_URL).then(()=>{
    console.log("Connected MongoDB successfully");
})

app.use('/v1/account',accountRouter);
app.use('/v1/topic', topicRouter);
app.use('/v1/registerTopic',registerTopicRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port "+process.env.PORT);
})
