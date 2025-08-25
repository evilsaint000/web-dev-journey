const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const JWT_SECRET = "annngggg";
const { z } = require("zod");

mongoose.connect("mongodb+srv://rishirajjsr20:VF9lHxqQYk2zkJLm@cluster0.ywmuh6y.mongodb.net/todo-app-database");
const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    const requiredbody = z.object({
        email : z.email() ,
        name : z.string().min(3).max(100) ,
        password : z.string().min(3).max(100)

    })

    // const parsedData = requiredbody.parse(req.body);
    const parsedDataSuccessfully = requiredbody.safeParse(req.body);

    if(!parsedDataSuccessfully.success){
        res.json({
            message: "invalid format",
            error : parsedDataSuccessfully.error
        })
        
    }

    const name = req.body.name;//string
    const password = req.body.password;//string
    const email = req.body.email;//string

    let errorthrown = false;

    try{
        const hashedPassword = await bcrypt.hash(password,5);
        console.log(hashedPassword);
        await UserModel.create({
            email:  email,
            password : hashedPassword,
            name : name
        })
    }catch(e){

        res.json({
            message : "user already exists"
        })
        errorthrown = true;
    }

    if(!errorthrown){
        res.json({
        message : "account made successfully"

        })
    }
    
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email : email,
        
    })

    if(!user){
        res.status(403).json({
            message : "user does not exist in out db"
        })
        return
    }

    const passwordMatch =  bcrypt.compare(password,user.password);

    console.log(user);

    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET);

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message : "incorrect credentials"
        })
    }

});


app.post("/todo",auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done

    await TodoModel.create({
        title,
        userId,
        done
    })

    res.json({
        userId : userId
    })


});


app.get("/todos",auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    })

    res.json({
        todos
    })

});


function auth (req,res,next){
    const token = req.headers.token;

    const decodedData = jwt.verify(token, JWT_SECRET);
    if(decodedData){
        req.userId = decodedData.id;
        next();
    }else{
        res.status(403),json({
            message : " na na na na "
        })
    }

}

app.listen(3000);