const express = require('express');
const app = express();
// function middleware(req,res,next){
//     console.log("the method is" + req.method);
//     console.log("the url is" + req.url);
//     console.log("the time is" + new Date());
//     next();
// }

// app.use(middleware);
app.use(express.json());

app.post('/sum', function(req,res){
    const a = req.query.a;
    const b = req.query.b;
    console.log(req.body);
    res.json({
        ans : parseInt(a) + parseInt(b)
    })

});







app.listen(3000);