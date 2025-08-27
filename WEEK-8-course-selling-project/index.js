// ...existing code...
require('dotenv').config();
const express = require('express');
const { userRouter } = require('./routes/users');
const { coursesRouter } = require('./routes/courses');
const { adminRouter } = require('./routes/admin');
const mongoose = require("mongoose");


const app = express();

app.use(express.json());


app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/courses", coursesRouter);

async function main(){
    await mongoose.connect(process.env.MONGODB_URI);

    app.listen(3000, () => {console.log('Server listening on port 3000');});
}

main();








