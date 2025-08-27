const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;



const User = new Schema({
    email : {type : String, unique : true},
    password : String,
    firstname : String,
    lastname : String

})

const Admin = new Schema({
    email : {type : String, unique : true},
    password : String,
    firstname : String,
    lastname : String
})

const Courses = new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId


})

const Purchase = new Schema({
    userId : ObjectId,
    courseId : ObjectId
})



const UserModel = mongoose.model("users", User);
const AdminModel = mongoose.model("admin", Admin);
const CourseModel = mongoose.model("courses",Courses);
const PurchasesModel = mongoose.model("purchases", Purchase);

module.exports = {
    UserModel : UserModel,
    AdminModel : AdminModel,
    CourseModel : CourseModel,
    PurchasesModel : PurchasesModel
}


