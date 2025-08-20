const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "randomrishiloverishi";
const app = express();
app.use(express.json());

const users = [];

// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         // use a simple function here
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// } 
app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //input validation using zod

    

    if( users.find(user => user.username === username)) {
        res.json({
            message: 'User already exists',
        })
    }
    users.push({
        username: username,
        password: password
    })
     res.json({
        message: 'User created successfully',
    })
    console.log(users);
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    

    const foundUser = users.find(function(user) {
        if (user.username === username && user.password === password) {
            return true;
        }
        return false;
    });

    if (foundUser){
        const token = jwt.sign({
            username : username
        }, JWT_SECRET) ;// converting username to JWT
        foundUser.token = token;

        res.json({
            message: 'User signed in successfully',
            token: token
        })

    }else{
        res.status(403).send({
            message: 'Invalid username or password',
        })
    }

    console.log(users);
});
app.get("/me", (req, res) => {
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

    const username = decodedInformation.username;

    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].token == token) {
            foundUser = users[i];
            break;
        }
    }

    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password
        });
    } else {
        res.status(404).json({ message: "token invalid" });
    }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));