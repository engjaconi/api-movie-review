import { Schema, model } from 'mongoose';

const MovieRating = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        unique: true
    },
    evaluationNote: {
        type: Number,
        require: true
    },
    comment: {
        type: String,
        require: false
    },

});

export default model('MovieRating', MovieRating);