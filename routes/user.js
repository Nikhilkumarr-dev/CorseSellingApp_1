const {Router} = require("express")
const {userModel}=require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config");


    userRouter.post("/signup", async function(req,res){
        const {email,password,firstName,lastName}=req.body;
        //plain password text is not accepted
        try{
            await  userModel.create({
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName
        })


        res.json({
            message:"signup suceeded"
        })
        }
        catch(e){
            res.status(403).json({
            message:"Failed to signin"
            })
        }
    })
    userRouter.post("/signin",async function(req,res){
        const {email,password}=req.body;

        const user = await userModel.findOne({
            email,
            password
        });

        if(user){
            const token = jwt.sign({
                id: user._id
            },JWT_USER_PASSWORD);
            res.json({
                token:token
            })
        }
        else
        {
            res.json({
                message:"incorrected credentials"
            })
        }
    })
    userRouter.get("/purchases",function(req,res){
        res.json({
            message:"signup endpoint"
        })
    })

    module.exports={
        userRouter:userRouter
    }

