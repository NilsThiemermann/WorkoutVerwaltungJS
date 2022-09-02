const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://hiemer:hiemer123@cluster0.spfsshp.mongodb.net/WorkoutVerwaltungDB?retryWrites=true&w=majority');
    }catch (err){
        console.error(err);
    }
}

module.exports = connectDB;