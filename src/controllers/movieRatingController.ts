import { Request, Response } from "express";

import { movieRatingRepository } from "../repositories/movieRatingRepository";
import { authService } from "../services/authService";
import { validatorsContract } from "../validators/validationContract";

export const MovieRatingController = {
    get: async (req: Request, res: Response) => {
        try {
            // Recupera o token
            const token = req.body.token || req.query.token || req.headers['x-acess-token'];
            // Decodifica o token
            const infoToken = await authService.decodeToken(token);

            const data = await movieRatingRepository.getAll(String(req.query.userId));
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' });
        }
    },

    post: async (req: Request, res: Response) => {
        validatorsContract.isRequired(req.body.token, 'O token é necessário');
        validatorsContract.isRequired(req.body.id, 'O id do usuário é necessário');
        validatorsContract.isRequired(req.body.movie, 'O id do filme é necessário');
        validatorsContract.isRequired(req.body.evaluationNote, 'A nota de avaliação é necessária');
        validatorsContract.isRequired(req.body.comment, 'O comentário é necessário');

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

            await movieRatingRepository.create({
                user: req.body.user,
                movie: req.body.movie,
                evaluationNote: req.body.evaluationNote,
                comment: req.body.comment
            });
            res.status(201).send({ message: 'Avaliação cadastrada com sucesso!' });
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' });
        }
    },

    put: async (req: Request, res: Response) => {
        validatorsContract.isRequired(req.body.token, 'O token é necessário');
        validatorsContract.isRequired(req.body.evaluationNote, 'A nota de avaliação é necessária');
        validatorsContract.isRequired(req.body.comment, 'O comentário é necessário');

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

            await movieRatingRepository.put(req.query.rating, req.body);
            res.status(200).send({ message: 'Avaliação atualizada com sucesso!' });
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' });
        }
    },

    delete: async (req: Request, res: Response) => {
        validatorsContract.isRequired(req.body.token, 'O token é necessário');

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

            await movieRatingRepository.delete(req.query.rating);
            res.status(200).send({ message: 'Produto removido com sucesso!' });
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' });
        }
    }
}