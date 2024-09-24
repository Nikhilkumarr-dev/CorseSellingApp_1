const express = require('express');
const {userRouter} = require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");
const app = express();
const jwt = require('jsonwebtoken');

mongoosse.connect("mongodb+srv://admin:MU9Nw4YfueewntQW@cluster0.00ffj.mongodb.net/CourseSellingApp_1");
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("api/v1/admin",adminRouter)
app.listen(3000);