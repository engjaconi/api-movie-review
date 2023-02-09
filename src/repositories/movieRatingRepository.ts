import MovieRating from "../models/MovieRating";

export const movieRatingRepository = {

    create: async (data: any) => {
        const rating = new MovieRating(data);
        await rating.save();
    },

    getAll: async (userId: string) => {
        const res = await MovieRating.find({ user: userId }).populate(['movie']);
        return res;
    },

    put: async (id: any, data: any) => {
        await MovieRating
            .findByIdAndUpdate(id, {
                $set: {
                    evaluationNote: data.evaluationNote,
                    comment: data.comment,
                }
            });
    },

    delete: async (id: any) => {
        await MovieRating.findByIdAndRemove(id);
    }
}