import mongoose, { Schema } from 'mongoose';

const Movie = new Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    title: {
        type: String,
        require: true
    },
    adult: {
        type: Boolean,
        require: true
    },
    overview: {
        type: String,
        require: true
    },
    poster_path: {
        type: String,
        require: true
    }
});

export default mongoose.model('Movie', Movie);