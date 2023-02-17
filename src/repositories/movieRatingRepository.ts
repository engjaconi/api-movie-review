import { IMovieRating } from "../interfaces/IMovieRating";
import MovieRating from "../models/MovieRating";

export class MovieRatingRepository {

    async create(data: IMovieRating): Promise<boolean> {
        if(await this.findRating(data)) {
            return false;
        }
        const rating = new MovieRating(data);
        await rating.save();
        return true;
    }

    async getAll(userId: string) {
        const res = await MovieRating.find({ user: userId }).populate(['movie']);
        return res;
    }

    async findRating(data: IMovieRating) {
        let hasRating = !!await MovieRating.find({ user: data.user, movie: data.movie  });
        return hasRating;
    }

    async put(id: string, data: IMovieRating) {
        await MovieRating
            .findByIdAndUpdate(id, {
                $set: {
                    evaluationNote: data.evaluationNote,
                    comment: data.comment,
                }
            });
    }

    async delete(id: string) {
        await MovieRating.findByIdAndRemove(id);
    }
}