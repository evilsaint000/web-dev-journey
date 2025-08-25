const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const JWT_SECRET = "annngggg";

mongoose.connect("mongodb+srv://rishirajjsr20:VF9lHxqQYk2zkJLm@cluster0.ywmuh6y.mongodb.net/todo-app-database");
const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email
    await UserModel.create({
        email:  email,
        password : password,
        name : name
    })

    res.json({
        message : "account made successfully"
    })
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email : email,
        password : password
    })

    console.log(user);

    if (user) {
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
        res.status(403),json{
            message : " na na na na "
        }
    }

}

app.listen(3000);