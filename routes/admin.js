const {Router} = require('express');
const adminRouter= Router();
const {adminModel, userModel, CourseModel}=require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");
const {adminMiddleWare}=require("../middleware/admin");
const { z } = require('zod');
const bcrypt=require('bcrypt');

    adminRouter.post("/signup",async function(req,res){

        const requireBody=z.object({
            email:z.string().min(3).max(100).email(),
            password:z.string().min(3).max(30).refine((value)=>{
                const hasUpperCase =/[A-Z]/.test(value);

                const hasLowerCase=/[a-z]/.test(value);
                
                const hasSpecialCharacter=/[!@#$%^&*()_<>]/.test(value);

                return hasLowerCase && hasSpecialCharacter && hasUpperCase;
            },{
                message:"password must contain at atleat one upper case and lowercase with splecial character"
            })
        })

        const parsedDatawithSuccess = requireBody.safeParse(req.body);
        if(!parsedDatawithSuccess.success)
        {
               res.json({
                message:"Incorrect Format",
                error: parsedDatawithSuccess.error
               }) 
               return
        }



        const {email,password,firstName,lastName}=req.body;


        //promisifing the fs function call
        const hashedPassword = await bcrypt.hash(password,5);

        console.log(hashedPassword);


            const user= await adminModel.create({
                email,
                password:hashedPassword,
                firstName,
                lastName
            })
            res.json({
                message:"signup succeded"
            })
    })
    adminRouter.post("/signin",adminMiddleWare,async function(req,res){

        const requireBody=z.object({
            email:z.string().min(3).max(100).email(),
            password:z.string().min(3).max(30).refine((value)=>{
                const hasUpperCase =/[A-Z]/.test(value);

                const hasLowerCase=/[a-z]/.test(value);
                
                const hasSpecialCharacter=/[!@#$%^&*()_<>]/.test(value);

                return hasLowerCase && hasSpecialCharacter && hasUpperCase;
            },{
                message:"password must contain at atleat one upper case and lowercase with splecial character"
            })
        })

        const parsedDatawithSuccess = requireBody.safeParse(req.body);
        if(!parsedDatawithSuccess.success)
        {
               res.json({
                message:"Incorrect Format",
                error: parsedDatawithSuccess.error
               }) 
               return
        }
        
        const email=req.body.email;
        const password=req.body.password;

        const admin = await adminModel.find({
            email:email,
    
        });

        if(!admin)
        {
            res.status(403).json({
                message:"admin doesnt exist"
            })
            return;
        }

        const passwordMatch=await bcrypt.compare(password,admin.password);


        
        if(passwordMatch)
        {
            const token = jwt.sign({
                id:admin._id
            },JWT_ADMIN_PASSWORD);

            res.json({
                token: token
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