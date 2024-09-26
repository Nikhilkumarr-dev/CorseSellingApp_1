const {Router} = require('express');
const adminRouter= Router();
const {adminModel, userModel, CourseModel}=require("../db");
const jwt = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD}=require("../config");
const {adminMiddleWare}=require("../middleware/admin");

    adminRouter.post("/signup",async function(req,res){
        const {email,password,firstName,lastName}=req.body;

            const user= await adminModel.create({
                email,
                password,
                firstName,
                lastName
            })
            res.json({
                message:"signup succeded"
            })
    })
    adminRouter.post("/signin",async function(req,res){
        const email=req.body.email;
        const password=req.body.password;

        const admin = await adminModel.find({
            email:email,
            password:password
        })
        
        if(admin)
        {
            const token = jwt.sign({
                id:admin._id
            },JWT_ADMIN_PASSWORD);

            res.json({
                token:  token
            })
        }
        else
        {
            res.json({
                message:"incorrect credentials"
            })
        }

    })
    adminRouter.post("/course",adminMiddleWare,async function(req,res){

        const adminId = req.userId;
        const {title,description,imageUrl,price}=req.body;

        const course = await CourseModel.create({
            title:title,
            description:description,
            imageUrl:imageUrl,
            price:price,
            creatorId:adminId
        })
        res.json({
            message:"course created",
            courseId:course._id
        })
    })
    adminRouter.put("/course",adminMiddleWare, async function(req,res){
        const adminId = req.userId;
        
        const {title,description,imageUrl,price,courseId}=req.body;



        const course = await CourseModel.updateOne({
            _id: courseId,
            creatorId:adminId
        },{
            title:title,
            description:description,
            imageUrl:imageUrl,
            price:price
        });
        res.json({
           message:'course Updated Successfully',
           courseId:course._id
        })
    })
    adminRouter.get("/course/bulk",adminMiddleWare,async function(req,res){
        const adminId = req.userId;

        const course = await CourseModel.find({
            creatorId:adminId
        });
        res.json({
            message:"course upadated",
            courses
        })
    })

module.exports={
    adminRouter: adminRouter        
}