import mongoose, { Schema } from 'mongoose';

const MovieRating = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
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

export default mongoose.model('MovieRating', MovieRating);