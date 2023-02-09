import express from "express";

import { MovieRatingController } from "../controllers/movieRatingController";

const movieRatingRoute = express.Router();

movieRatingRoute.post('/', MovieRatingController.post);
movieRatingRoute.get('/', MovieRatingController.get);
movieRatingRoute.put('/', MovieRatingController.put);
movieRatingRoute.delete('/', MovieRatingController.delete);

export default movieRatingRoute;