const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

function middleware(req,res,next){
    console.log('I am a middleware');
    console.log(req.url);
    console.log(req.method);
    console.log(new Date());
    next();

}

// app.use(middleware);

app.get('/sum',middleware, function(req,res){
    const a = req.query.a;
    const b = req.query.b;
    console.log(req.body);
    res.json({
        ans : parseInt(a) + parseInt(b)
    })


});







app.listen(3000);