import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        title: 'Movie Review API',
        version: '1.0.0'
    });
});

export default router;