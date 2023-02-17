import { Router } from "express";
import { MovieController } from "../controllers/MovieController";

export const movieRoute = Router();
const movieControler = new MovieController();

movieRoute.post('/', movieControler.post);
movieRoute.get('/', movieControler.get);