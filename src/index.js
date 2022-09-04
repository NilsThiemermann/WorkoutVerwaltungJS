const express = require('express');
const app = express();
const port = 5001;

const connectDB = require('./db/dbConn');
const mongoose= require('mongoose');

const userRouter = require('./routes/api/users');

//connect to MongoDB
connectDB();

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//user routes 
app.use(userRouter);

// built-in middleware for json 
app.use(express.json());

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
