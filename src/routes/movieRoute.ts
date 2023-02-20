import { Router } from "express";
import { MovieController } from "../controllers/movieController";

export const movieRoute = Router();
const movieControler = new MovieController();

movieRoute.post('/', movieControler.post);
movieRoute.get('/', movieControler.get);