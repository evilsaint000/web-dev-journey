const express = require ('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require ('cors');
const JWT_SECRET = "rishilovesrishi";
app.use(express.json());
app.use(cors());
// serve static files from public (style.css, client JS, assets)
app.use(express.static(path.join(__dirname, 'public')));

const users = [];

function logger(req,res,next){
    console.log(req.method+ "request came");
    next();
}

app.use(logger);

//localhost:3000
app.get('/',(req,res) => {
    res.sendFile(__dirname + "/public/index.html");
})



app.post('/signup', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username : username,
        password : password,
    })

    res.json({
        message : "user created successfully"
    });

    console.log(users); // could be a vulnerability
})


app.post('/signin',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for(let i = 0; i<users.length; i++){
        if(users[i].username == username && users[i].password == password){
            foundUser = users[i];
        }
    }

    if(foundUser){
        const token = jwt.sign({
            username : username
        }, JWT_SECRET);

        res.header("token", token);

        res.json({
            token : token
        })
    }else{
        res.status(403).send({
            message : "invalid username or password"
        })
    }


    console.log(users);

})



function auth (req,res,next){
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    let decodedInformation;
    try {
        decodedInformation = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: 'Token invalid' });
    }

    if(decodedInformation.username){
        req.username = decodedInformation.username;
        next();
    }else{
        res.json({
            message : " you are not logged in"
        })
    }

}

app.get('/me',auth,(req,res) => {    
    let foundUser = null;
    for(let i = 0; i<users.length; i++){
        if(users[i].username === req.username){
            foundUser = users[i];
        }
    }
    res.json({
        username : foundUser.username,
        password : foundUser.password
    })
    
})

app.listen(3000, () => console.log('Server running at http://localhost:3000'));