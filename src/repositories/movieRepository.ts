import { IMovie } from "../interfaces/IMovie";
import Movie from "../models/Movie";

export class MovieRepository {

    async create(data: IMovie) { 
        const movie = new Movie(data);
        await movie.save();
    }
}