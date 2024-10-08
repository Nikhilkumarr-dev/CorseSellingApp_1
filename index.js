// require('dotenv').config()
// console.log(process.env.MONOGO_URL)
const express = require('express');
const mongoose = require('mongoose');
const {z}=require('zod');
const bcrypt=require('bcrypt');


const {userRouter} = require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");


const app = express();
app.use(express.json())


app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter)

async function main(){


    await mongoose.connect("mongodb+srv://admin:MU9Nw4YfueewntQW@cluster0.00ffj.mongodb.net/Udemy");
    app.listen(3005);


    console.log("listening onport");
    
}
main();
