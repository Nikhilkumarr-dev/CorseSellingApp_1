const {Router} = require('express');
const adminRouter= Router();
const {adminModel, userModel, CoursenModel}=require("../db");
const jwt = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD}=require("../config");
const {adminMiddelWare}=require("../middleware/admin");

    adminRouter.post("/signup",async function(req,res){
        const {email,password,firstName,lastName}=req.body;
         try{       
        const user= await userModel.create({
            email,
            password,
            firstName,
            lastName
        })
        res.json({
            message:"signup succeded"
        })
        }
        catch(e)
        {
            message:"credentails are wrong"
        }
    })
    adminRouter.post("/signin",async function(req,res){
        const email=req.body.email;
        const password=req.body.password;

        const admin = await userModel.find({
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
    adminRouter.get("/course",adminMiddelWare,async function(req,res){

        const adminId = req.userId;
        const {title,description,imageUrl,price}=req.body;

        const course = await CoursenModel.create({
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
    adminRouter.put("/course",function(req,res){
        res.json({
            message:"signup endpointt"
        })
    })
    adminRouter.post("/course/bulk",function(req,res){
        res.json({
            message:"signup endpoint"
        })
    })

module.exports={
    adminRouter: adminRouter        
}