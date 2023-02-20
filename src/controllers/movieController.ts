import { Request, Response } from 'express';
import Axios from 'axios';
import { AuthService } from '../services/authService';
import { ValidatorsContract } from '../validators/ValidationContract';
import { MovieRepository } from '../repositories/MovieRepository';
import { IMovie } from '../interfaces/IMovie';

const authService = new AuthService();
const validatorsContract = new ValidatorsContract();
const movieRepository = new MovieRepository();

const axios = Axios.create();

export class MovieController {
    async get(req: Request, res: Response) {

        validatorsContract.isRequired(req.body.token, 'O token é necessário');

        if (!validatorsContract.isValid()) {
            res.status(400).send(validatorsContract.getErrors()).end();
            validatorsContract.clear();
            return;
        }

        // Decodifica o token
        const data = authService.decodeToken(req);

        let isAdult = Number(data!.age) >= 18;
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY_MOVIE_DB}&language=pt-BR&query=${req.query.search}&include_adult=${isAdult}`;

        await axios.get(URL)
            .then(resposta => resposta.data.results)
            .then(movies => movies.map((movie: IMovie) => {
                return {
                    id: movie.id,
                    title: movie.title,
                    adult: movie.adult,
                    overview: movie.overview,
                    poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                }
            }))
            .then(movieList => res.send(movieList))
            .catch(erro => console.log('Error: ', erro))
    }

    async post(req: Request, res: Response) {
        validatorsContract.isRequired(req.body.token, 'O token é necessário');
        validatorsContract.isRequired(req.body.id, 'O id é necessário');
        validatorsContract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
        validatorsContract.hasMinLen(req.body.overview, 3, 'A avaliação deve conter pelo menos 3 caracteres');
        validatorsContract.isRequired(req.body.poster_path, 'A imagem é necessária');

        if (!validatorsContract.isValid()) {
            res.status(400).send(validatorsContract.getErrors()).end();
            validatorsContract.clear();
            return;
        }

        if (authService.authorize(req)) {
            movieRepository
                .create({
                    id: req.body.id,
                    title: req.body.title,
                    adult: req.body.adult,
                    overview: req.body.overview,
                    poster_path: req.body.poster_path
                })
                .then(() => res.status(201).send({ message: 'Filme cadastrado com sucesso!' }))
                .catch(() => res.status(500).send({ message: 'Falha ao processar a requisição' }));
        } else {
            res.status(401).send({ message: 'Token inválido' })
        }
    }
}