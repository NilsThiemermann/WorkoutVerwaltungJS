const express = require('express');
const session = require('express-session');
const dbStore = require('connect-mongodb-session')(session);

const bodyParser = require("body-parser");

const connectDB = require('./db/dbConn');
const mongoose = require('mongoose');

const app = express();
const port = 5001;

const userRouter = require('./routes/api/users');
const workoutRouter = require('./routes/api/workouts');

//connect to MongoDB
connectDB();

const store = new dbStore({
    uri: 'mongodb+srv://hiemer:hiemer123@cluster0.spfsshp.mongodb.net/WorkoutVerwaltungDB?retryWrites=true&w=majority',
    collection: "mySessions"
});

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
    secret: 'xDerSecretKey',
    saveUninitialized: false,
    resave: false,
    store: store
}));

//user routes 
app.use(userRouter);
app.use(workoutRouter);

app.use(bodyParser.json());

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
