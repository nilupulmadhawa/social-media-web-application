import express from 'express';
import { login, register } from '../controllers/auth';
import { isHumen } from '../middleware/auth'
import { celebrate, Segments } from 'celebrate'


import { registerSchema, loginSchema } from '../validations/user';

const authRouter = express.Router();

authRouter.post('/login', celebrate({ [Segments.BODY]: loginSchema }), isHumen, login);
authRouter.post('/register', celebrate({ [Segments.BODY]: registerSchema }), isHumen, register);

export default authRouter;