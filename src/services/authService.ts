import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { IUser } from '../interfaces/IUser';

export class AuthService {
    generateToken(data: any) {
        return jwt.sign(data, config.SALT_KEY, { expiresIn: '1d' });
    }

    getToken(req: Request): string {
        // Recupera o token
        return req.body.token || req.query.token || req.headers['x-acess-token'];
    }

    decodeToken(req: Request) {
        // Válida o token e retorna o conteúdo
        if (this.authorize(req)) {
            const data: IUser = <IUser>jwt.verify(this.getToken(req), config.SALT_KEY);
            return data;
        }
    }

    authorize(req: Request): boolean {
        let isValidToken = false;
        jwt.verify(this.getToken(req), config.SALT_KEY, (error: any) => {
            if (!error) {
                isValidToken = true;
            }
        });
        return isValidToken;
    }
}