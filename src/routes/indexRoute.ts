import { Router, Request, Response } from 'express';

export const indexRouter = Router();

indexRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        title: 'Movie Review API',
        version: '1.0.0'
    });
});