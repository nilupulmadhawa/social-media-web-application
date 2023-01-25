import express from 'express';
import { getAll, getById, remove, update } from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/', getAll);
userRouter.get('/:id', getById);
userRouter.put('/:id', update);
userRouter.delete('/:id', remove);

export default userRouter;