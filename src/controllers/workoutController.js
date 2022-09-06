const Workouts = require('../model/Workout');

const getWorkouts = async (req, res) => {

    const result = await Workouts.find({userid: req.session.userid}).exec();

    console.log(result);
    res.json(result);

};

const postWorkout = async (req, res) => {

    console.log("Ja so en userid: "+req.session.userid);
/*
    if (!req.session.isAuth){
        //redirect to login if null
        res.redirect('http://localhost:5001/login');
    }
*/
    const { workout, exercise, repetitions, weight } = req.body;

    try {
        //create and store new Workout
        const result = await Workouts.create({
            "workout": workout,
            "exercise": exercise,
            "repetitions": repetitions,
            "weight": weight,
            "userid": req.session.userid
         });

        console.log(result);
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
};

module.exports = {
    postWorkout,
    getWorkouts
};