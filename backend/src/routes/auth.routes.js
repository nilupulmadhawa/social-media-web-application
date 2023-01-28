import express from 'express';
import { login, register } from '../controllers/auth';
import { isHumen } from '../middleware/auth'

const authRouter = express.Router();

authRouter.post('/login', isHumen, login);
authRouter.post('/register', isHumen, register);

export default authRouter;