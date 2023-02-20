import md5 from 'md5';
import { Request, Response } from 'express';
import { config } from '../../config';
import { UserRepository } from '../repositories/UserRepository';
import { ValidatorsContract } from '../validators/ValidationContract';
import { AuthService } from '../services/authService';


const validatorsContract = new ValidatorsContract();
const authService = new AuthService();
const userRepository = new UserRepository();

export class UserController {
    async post(req: Request, res: Response) {
        validatorsContract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
        validatorsContract.isRequired(req.body.age, 'A idade é necessária');
        validatorsContract.isEmail(req.body.email, 'E-mail inválido');
        validatorsContract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

        if (!validatorsContract.isValid()) {
            res.status(400).send(validatorsContract.getErrors()).end();
            validatorsContract.clear();
            return;
        }

        try {
            await userRepository.create({
                name: req.body.name,
                age: req.body.age,
                email: req.body.email,
                password: md5(req.body.password + config.SALT_KEY),
            });

            res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' });
        }

    }

    async authenticate(req: Request, res: Response) {
        try {
            const user = await userRepository
                .authenticate(
                    req.body.email,
                    md5(req.body.password + config.SALT_KEY)
                );

            if (!user) {
                res.status(404).send({
                    message: 'Usuário ou senha inválido'
                });
                return;
            }

            const token = authService.generateToken({
                id: user._id,
                email: user.email,
                name: user.name,
                age: user.age
            })

            res.status(201).send({
                token: token
            });
    } catch(error) {
        res.status(500).send({ message: 'Falha ao processar a requisição' });
    }
}
}