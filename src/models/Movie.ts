import { Schema, model } from 'mongoose';

const Movie = new Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    title: {
        type: String,
    },
    adult: {
        type: Boolean,
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

export default model('Movie', Movie);