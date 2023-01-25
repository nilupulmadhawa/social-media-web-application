import express from 'express';
import { getAll, getById, remove, update, changePassword } from '../controllers/user';
import { userProtect } from '../middleware/auth'

const userRouter = express.Router();

userRouter.get('/', getAll);
userRouter.get('/:id', getById);
userRouter.patch('/:id', userProtect, update);
userRouter.delete('/:id', userProtect, remove);
userRouter.put('/password', changePassword);

export default userRouter;