const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const userSchema =new  Schema({
/* //this required true must used for the  Mongoose means that the field is mandatory when creating or updating a document. If a required field is not provided, Mongoose will throw a validation error and the document will not be saved to the database. this should be added for every schema of a database */
    email:{type:String, unique:true,required: true},
    password:String,
    firstName:String,
    lastName:String,
});
const adminSchema= new Schema({
    email:{type:String, unique:true},
    password:String,
    firstaName:String,
    lastName:String,
})
const courseSchema= new Schema({
   title:String,
   description:String,
   price:Number,
   imageUrL:String,
   creatorId:ObjectId
})
const purchaseSchema= new Schema({
    userId: ObjectId,
    courseId:ObjectId
})

const userModel=mongoose.model("user",userSchema)
const adminModel=mongoose.model("admin",adminSchema)
const CourseModel=mongoose.model("course",courseSchema)
const purchaseModel=mongoose.model("purchase",purchaseSchema)

module.exports={
    userModel,
    adminModel,
    CourseModel,
    purchaseModel
}