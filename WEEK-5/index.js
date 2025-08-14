const express = require('express');
const app = express();

app.get('/sum/:a/:b', function(req,res){
    const a = req.params.a;
    const b = req.params.b;
    res.json({
        ans : parseInt(a) + parseInt(b)
    })

});
app.get('/minus/:a/:b', function(req,res){
    const a = req.params.a;
    const b = req.params.b;
    res.json({
        ans : parseInt(a) - parseInt(b)
    })
});
app.get('/divide/:a/:b', function(req,res){
    const a = req.params.a;
    const b = req.params.b;
    res.json({
        ans : parseInt(a) / parseInt(b)
    })
});
app.get('/multiply/:a/:b', function(req,res){
    const a = req.params.a;
    const b = req.params.b;
    res.json({
        ans : parseInt(a) * parseInt(b)
    })
});


app.listen(3000);