import express from 'express';
import { getAll, getById, remove, update } from '../controllers/user';
import { userProtect } from '../middleware/auth'

const userRouter = express.Router();

userRouter.get('/', getAll);
userRouter.get('/:id', getById);
userRouter.put('/:id', userProtect, update);
userRouter.delete('/:id', userProtect, remove);

export default userRouter;