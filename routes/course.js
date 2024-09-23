function createCourseRoute(app){
    app.post("/course/purchase",function(req,res){
        res.json({
            message:"signup endpoint"
        })
    })
    app.get("/course",function(req,res){
        res.json({
            message:"signup endpoint"
        })
    })
}

module.exports={
    createCourseRoute : createCourseRoute
}