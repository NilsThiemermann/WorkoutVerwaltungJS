const bcrypt = require('bcrypt');
const Users = require('../model/User');

const workout = require('./workoutController');

workout.loggedIn = false;

const createUser = async (req, res) => {
    const {username, password} = req.body;

    console.log(username, password);

    if (!username || !password) return res.status(400).json({"message": "Username and password required!"});

    //checking for available username
    const usernameChecker = await Users.findOne({username: username}).exec();
    if(usernameChecker) return res.sendStatus(409);
    try {
         //hashing password
         const hashedPw = await bcrypt.hash(password, 10);
         //create and store new user
         const result = await Users.create({
            "username": username,
            "password": hashedPw
         });
        /*
            const newUser = new Users({
                "username": user,
                "password": hashedPw
            });

            const result = await newUser.save();
        */ 

         console.log(result);

         res.status(201).json({ "success": "New user ${username} created!" });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).json({"message": "Username and password required!"});

    //checking for available username
    const findUser = await Users.findOne({username: username}).exec();
    if(!findUser) return res.sendStatus(401);
    // evaluate pw
    const match = await bcrypt.compare(password, findUser.password);
    if(match){
        res.json({ "success": "User ${username} is logged in!" })
    }else{
        res.sendStatus(401);
    }
    workout.userId = findUser._id;
}

module.exports = {
    createUser,
    login
};