const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    workout: {
        type: String,
        required: true
    },
    exercise: {
        type: String,
        required: true
    },
    repetitions: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Workout', workoutSchema);