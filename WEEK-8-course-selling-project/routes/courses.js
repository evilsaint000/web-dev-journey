const { Router } = require('express');
const coursesRouter = Router();

const {CourseModel} = require("../db");


coursesRouter.post("/purchases", function(req,res){
    res.json({
        message : "signup endpoint"
    })
})

coursesRouter.get("/preview", function(req,res){
    res.json({
        message : "signup endpoint"
    })
})

module.exports = {
    coursesRouter : coursesRouter
}