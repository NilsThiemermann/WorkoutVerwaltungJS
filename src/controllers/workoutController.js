const Workouts = require('../model/Workout');

const mongoose = require('mongoose');

const getWorkouts = async (req, res) => {

    const result = await Workouts.find({userid: req.session.userid}).exec();
    
    res.render('workouts', { result: result });

};

const getCreateWorkout = async (_, res) => {
    
    res.render('createWorkout');
}

const createWorkout = async (req, res) => {

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

        res.redirect('/workouts');
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
};

const getUpdateWorkout = async (req, res) => {
    
    const id = mongoose.Types.ObjectId(req.query);

    const result = await Workouts.findById(id).exec();

    res.render('updateWorkout', { obj: result });
}

const updateWorkout = async (req, res) => {

    const { _id, workout, exercise, repetitions, weight } = req.body;

    const update = {
        "workout": workout,
        "exercise": exercise,
        "repetitions": repetitions,
        "weight": weight
    };

    try {
        const result = await Workouts.findOneAndUpdate(_id, update, {
            new: true
        });

        res.redirect('/workouts');
    } catch(err){
        res.status(500).json({ "message": err.message })
    }
}

const deleteWorkout = async (req, res) => {
    const { _id } = req.query;

    try {
        const result = await Workouts.findOneAndDelete(_id);

        res.redirect('/workouts');
    } catch(err){
        res.status(500).json({ "message": err.message })
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,
    getCreateWorkout,
    getUpdateWorkout
};