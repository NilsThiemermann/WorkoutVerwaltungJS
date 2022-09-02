const express = require('express');
const app = express();
const port = 5001;

const connectDB = require('./db/dbConn');
const mongoose= require('mongoose');

const userRouter = require('./routers/userRouters');

//connect to MongoDB
connectDB();

//
app.use(userRouter)

//Hello World
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//
mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB')
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});
