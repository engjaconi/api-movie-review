import { Request, Response } from "express";
import { Error } from "mongoose";
import { MovieRatingRepository } from "../repositories/MovieRatingRepository";
import { AuthService } from "../services/AuthService";
import { ValidatorsContract } from "../validators/ValidationContract";

const authService = new AuthService();
const validatorsContract = new ValidatorsContract();
const movieRatingRepository = new MovieRatingRepository();

export class MovieRatingController {
    get(req: Request, res: Response) {
        validatorsContract.isRequired(req.body.token, 'O token é necessário');

        if (!validatorsContract.isValid()) {
            res.status(400).send(validatorsContract.getErrors()).end();
            validatorsContract.clear();
            return;
        }

        if (authService.authorize(req)) {
            movieRatingRepository
                .getAll(String(req.query.userId))
                .then(data => res.status(200).send(data))
                .catch(() => res.status(500).send({ message: 'Falha ao processar a requisição' }));
        } else {
            res.status(401).send({ message: 'Token inválido' })
        }
    }

    post(req: Request, res: Response) {
        validatorsContract.isRequired(req.body.token, 'O token é necessário');
        validatorsContract.isRequired(req.body.user, 'O id do usuário é necessário');
        validatorsContract.isRequired(req.body.movie, 'O id do filme é necessário');
        validatorsContract.isRequired(req.body.evaluationNote, 'A nota de avaliação é necessária');
        validatorsContract.isRequired(req.body.comment, 'O comentário é necessário');

        if (!validatorsContract.isValid()) {
            res.status(400).send(validatorsContract.getErrors()).end();
            validatorsContract.clear();
            return;
        }

        if (authService.authorize(req)) {
            movieRatingRepository
                .create({
                    user: req.body.user,
                    movie: req.body.movie,
                    evaluationNote: req.body.evaluationNote,
                    comment: req.body.comment
                })
                .then((isCreated) => {
                    if (isCreated) {
                        res.status(201).send({ message: 'Avaliação cadastrada com sucesso' });
                    } else {
                        res.status(400).send({ message: 'Avaliação já cadastrada' });
                    }
                })
                .catch(() => res.status(500).send({ message: 'Falha ao processar a requisição' }));
        } else {
            res.status(401).send({ message: 'Token inválido' })
        }
    }

    async put(req: Request, res: Response) {
        validatorsContract.isRequired(req.body.token, 'O token é necessário');
        validatorsContract.isRequired(req.body.evaluationNote, 'A nota de avaliação é necessária');
        validatorsContract.isRequired(req.body.comment, 'O comentário é necessário');

        if (!validatorsContract.isValid()) {
            res.status(400).send(validatorsContract.getErrors()).end();
            validatorsContract.clear();
            return;
        }

        if (authService.authorize(req)) {
            movieRatingRepository
                .put(<string>req.query.rating, req.body)
                .then(() => res.status(200).send({ message: 'Avaliação atualizada com sucesso!' }))
                .catch(() => res.status(500).send({ message: 'Falha ao processar a requisição' }));
        } else {
            res.status(401).send({ message: 'Token inválido' })
        }
    }

    async delete(req: Request, res: Response) {
        validatorsContract.isRequired(req.body.token, 'O token é necessário');

        if (!validatorsContract.isValid()) {
            res.status(400).send(validatorsContract.getErrors()).end();
            validatorsContract.clear();
            return;
        }

        if (authService.authorize(req)) {
            movieRatingRepository
                .delete(<string>req.query.rating)
                .then(() => res.status(200).send({ message: 'Produto removido com sucesso!' }))
                .catch(() => res.status(500).send({ message: 'Falha ao processar a requisição' }));
        } else {
            res.status(401).send({ message: 'Token inválido' })
        }
    }
}