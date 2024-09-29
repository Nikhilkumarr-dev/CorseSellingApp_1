require('dotenv').config()
console.log(process.env.MONOGO_URL)
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const {userRouter} = require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");
const app = express();
const jwt = require('jsonwebtoken');
const {z}=require("zod");
app.use(express.json())


app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter)

async function main(){


    await mongoose.connect("mongodb+srv://admin:MU9Nw4YfueewntQW@cluster0.00ffj.mongodb.net/CourseSellingApplication1");
    app.listen(3000);


    console.log("listening onport");
    
}


main();
