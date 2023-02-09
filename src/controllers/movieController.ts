import { Request, Response } from 'express';
import axios from 'axios';

import { validatorsContract } from '../validators/validationContract';
import { authService } from '../services/authService';
import { movieRepository } from '../repositories/movieRepository';


let instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/search/movie',
});

interface JwtPayload {
    age: string;
}

export const movieController = {
    get: async (req: Request, resposta: Response) => {
        validatorsContract.isRequired(req.body.token, 'O token é necessário');

        if (!validatorsContract.isValid()) {
            resposta.status(400).send(validatorsContract.getErrors()).end();
            validatorsContract.clear();
            return;
        }

        // Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-acess-token'];

        // Decodifica o token
        const data = await authService.decodeToken(token) as JwtPayload;

        let isAdult = Number(data.age) >= 18;
        await instance.get('/', {
            params: {
                api_key: process.env.API_KEY_MOVIE_DB,
                language: 'pr-BR',
                query: req.query.search,
                include_adult: isAdult
            }
        })
            .then((res) => {
                ;
                resposta.send(res.data.results);
            })
            .catch(function (error) {
                console.error(error);
            });
    },

    post: async (req: Request, res: Response) => {
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

        try {
            // Recupera o token
            const token = req.body.token || req.query.token || req.headers['x-acess-token'];

            // Decodifica o token
            const data = await authService.decodeToken(token);
            await movieRepository.create({
                id: req.body.id,
                title: req.body.title,
                adult: req.body.adult,
                overview: req.body.overview,
                poster_path: req.body.poster_path
            });

            res.status(201).send({ message: 'Filme cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' });
        }
    }
}