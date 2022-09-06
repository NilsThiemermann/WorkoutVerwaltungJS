const express = require('express');
const router = express.Router();
const workoutController = require('../../controllers/workoutController');
const isAuth = require('../../middleware/is_auth');

router.post('/create_workout', isAuth, workoutController.postWorkout);

router.get('/workouts', isAuth, workoutController.getWorkouts);

router.put('/update_workout', isAuth, _);

router.delete('/delete_workout', isAuth, _);

module.exports = router;