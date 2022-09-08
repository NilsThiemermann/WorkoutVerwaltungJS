const express = require('express');
const router = express.Router();
const workoutController = require('../../controllers/workoutController');
const isAuth = require('../../middleware/is_auth');

router.post('/create_workout', isAuth, workoutController.createWorkout);

router.get('/workouts', isAuth, workoutController.getWorkouts);

router.post('/update_workout', isAuth, workoutController.updateWorkout);

router.get('/delete_workout', isAuth, workoutController.deleteWorkout);

router.get('/create_workout', isAuth, workoutController.getCreateWorkout);

router.get('/update_workout', isAuth, workoutController.getUpdateWorkout)

module.exports = router;