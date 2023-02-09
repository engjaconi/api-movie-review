import express from "express";

import { movieController } from "../controllers/movieController";

const movieRoute = express.Router();

movieRoute.post('/', movieController.post);
movieRoute.get('/', movieController.get);

export default movieRoute;