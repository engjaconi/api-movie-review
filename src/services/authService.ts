import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../../config';

export const authService = {
    generateToken: async (data: any) => {
        return jwt.sign(data, config.SALT_KEY, { expiresIn: '1d' });
    },

    decodeToken: async (token: string) => {
        const data = await jwt.verify(token, config.SALT_KEY);
        return data;
    },

    authorize: function (req: Request, res: Response, next: NextFunction) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        jwt.verify(token, config.SALT_KEY, (error: any) => {
            if (error) {
                res.status(401).json({ message: "Token Inválido" });
            } else {
                next();
            }
        })
    }
}