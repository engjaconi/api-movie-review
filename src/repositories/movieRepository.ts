import Movie from "../models/Movie";

export const movieRepository = {

    create: async (data: any) => {
        const movie = new Movie(data);
        await movie.save();
    }
}