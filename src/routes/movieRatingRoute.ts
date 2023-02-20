import { Router } from "express";
import { MovieRatingController } from "../controllers/movieRatingController";

export const movieRatingRoute = Router();
const movieRatingControler = new MovieRatingController;

movieRatingRoute.post('/', movieRatingControler.post);
movieRatingRoute.get('/', movieRatingControler.get);
movieRatingRoute.put('/', movieRatingControler.put);
movieRatingRoute.delete('/', movieRatingControler.delete);