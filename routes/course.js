const {Router} = require("express")

const courseRouter = Router();

const {userMiddleWare}=require("../middleware/user");
const { purchaseModel, CourseModel } = require("../db");

    courseRouter.post("/purchase",async function(req,res){

        const userId = req.userId;
        const courseId=req.body.courseId;

        //to check whether the user has actually paid for the course
        await purchaseModel.create({
            userId,
            courseId
        })
        res.json({
            message:"you have successfully bought the course"
        })
    })
    courseRouter.get("/preview", async function(req,res){
        const courses = await CourseModel.find({});

        res.json({
            courses
        })
    })


module.exports={
    courseRouter:courseRouter
}