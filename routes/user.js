const {Router} = require("express")
const {userModel, purchaseModel, CourseModel}=require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config");
const {userMiddleWare}=require("../middleware/user")
const {z}=require('zod');
const bcrypt=require('bcrypt');


    userRouter.post("/signup", async function(req,res){


        const requireBody = z.object({
             email:z.string().min(3).max(100).email(),
             password:z.string().min(3).max(100).refine((value)=>{
                const hasLowerCase=/[a-z]/.test(value);
                const hasUpperCase=/[A-Z]/.test(value);
                const specialCharacter=/[!@#$%^&*()_><]/.test(value);
                return hasLowerCase && hasUpperCase && specialCharacter;
             },{
                message:"password must contain special character and uppercase and lower case letters"
             })
        })

        const parsedDatawithSuccess= requireBody.safeParse(req.body);

        if(!parsedDatawithSuccess.success)
        {
            res.json({
                message:"incorrect format",
                error:parsedDatawithSuccess.error

            })

            return
        }
        const {email,password,firstName,lastName}=req.body;


        const hashedPassword = await bcrypt.hash(password,5);

        console.log(hashedPassword);
        //plain password text is not accepted
        try{
            await  userModel.create({
            email:email,
            password:hashedPassword,
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
            email
        });

        if(!user)
        {
            res.status(403).json(
                {
                    message:"user doesnt exist"
                })
            return
        }

        const passwordMatch=await bcrypt.compare(password,user.password);


        if(passwordMatch){
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
    userRouter.get("/purchases",userMiddleWare,async function(req,res){

        const userId= req.userId;
        const purchases = await purchaseModel.find({
            userId,

        });


        const courseData = await CourseModel.fing({
            _id:{ $in : purchases.map(x=>x.courseId)}
        });
        
        res.json({
           purchases
        })
    })

    module.exports={
        userRouter:userRouter
    }

