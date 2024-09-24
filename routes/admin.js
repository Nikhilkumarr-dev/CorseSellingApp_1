const {Router} = require('express');
const adminRouter= Router();


    adminRouter.post("/signup",function(req,res){
        res.json({
            message:"signup end point"
        })
    })
    adminRouter.post("/signin",function(req,res){
        res.json({
            message:"signin endpoint"
        })
    })
    adminRouter.get("/purchases",function(req,res){
        res.json({
            message:"signup endpoint"
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