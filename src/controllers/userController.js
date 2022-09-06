const bcrypt = require('bcrypt');
const Users = require('../model/User');

const createUser = async (req, res) => {
    const {username, password} = req.body;

    console.log(username, password);

    if (!username || !password) return res.status(400).json({"message": "Username and password required!"});

    //checking for available username
    const usernameChecker = await Users.findOne({username: username}).exec();
    if(usernameChecker) return res.redirect('/register');
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
        //res.status(201).json({ "success": "New user ${username} created!" });
        res.redirect('/login');
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).json({"message": "Username and password required!"});

    //checking for available username
    const findUser = await Users.findOne({username: username}).exec();
    if(!findUser) return res.redirect('/login');
    // evaluate pw
    const match = await bcrypt.compare(password, findUser.password);
    if(!match){
        return res.redirect('/login');
    }
    
    req.session.userid = findUser._id;
    req.session.isAuth = true;

    res.json({ "success": `User ${username} is logged in!` });  

    //res.redirect('/');
}

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        //res.redirect('/login');
        res.json({ "message": "User loggedout" });
    });
}

module.exports = {
    createUser,
    login,
    logout
};