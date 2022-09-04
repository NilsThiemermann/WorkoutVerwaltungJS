const Workouts = require('../model/Workout');

var userId;

const createWorkout = async (req, res) => {

    if (userId == null){
        //redirect to login
    }
    const { workout, exercise, repetitions, weight } = req.body;

    try {
        //create and store new Workout
        const result = await Workouts.create({
            "workout": workout,
            "exercise": exercise,
            "repetitions": repetitions,
            "weight": weight,
            "userid": userId
         });

        console.log(result);
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports = {
    userId,
    createWorkout
};