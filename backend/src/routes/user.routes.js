import express from 'express';
import { getAll, getById, remove, update, changePassword } from '../controllers/user';
import { userProtect } from '../middleware/auth'
import { celebrate, Segments } from 'celebrate'

import { userIdSchema, resetPasswordSchema } from '../validations/user';
const userRouter = express.Router();

// userRouter.get('/', getAll);
// userRouter.get('/:id', getById);
userRouter.patch('/:id', celebrate({ [Segments.PARAMS]: userIdSchema }), userProtect, update);
// userRouter.delete('/:id', userProtect, remove);
userRouter.put('/password', celebrate({ [Segments.BODY]: resetPasswordSchema }), changePassword);

export default userRouter;