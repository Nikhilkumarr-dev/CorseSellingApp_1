const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const userSchema = Schema({
    email:{type:String, unique:true},
    password:String,
    firstaName:String,
    lastName:String,
});
const adminSchema=Schema({
    email:{type:String, unique:true},
    password:String,
    firstaName:String,
    lastName:String,
})
const courseSchema=Schema({
   title:String,
   description:String,
   price:Number,
   iamgeUrL:String,
   creatorId:ObjectId
})
const purchaseSchema=Schema({
    userId: ObjectId,
    courseId:ObjectId
})

const userModel=mongoose.Model("user",userSchema)
const adminModel=mogoose.Model("admin",adminSchema)
const CoursenModel=mogoose.Model("course",courseSchema)
const purchaseModel=mogoose.Model("purchase",purchaseSchema)

module.exports={
    userModel,
    adminModel,
    CoursenModel,
    purchaseModel
}