import { Router } from "express";
import { UserController } from "../controllers/userController";

export const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', userController.post);
userRouter.post('/login', userController.authenticate);