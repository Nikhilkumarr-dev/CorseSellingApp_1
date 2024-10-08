const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");




function userMiddleWare(req,res,next){
    const token = req.headers.token;

    if(!token)
    {
        res.status(403).json({
            message:"token not provided"
        })
    }

    try{
    const decoded = jwt.verify(token,JWT_USER_PASSWORD)


        req.userId = decoded.id;
        next()
    }
    catch(e){
    
        res.status(403).json({
            message:"invalid or expired token"
        })
    }
    
}

module.exports={
    userMiddleWare:userMiddleWare
}