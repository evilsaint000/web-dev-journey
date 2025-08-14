// const fs = require('fs');

// fs.readFile("a.txt", "utf8", function(err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

const express = require('express')
const app = express()

//route handlers
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000) //which port to listen on