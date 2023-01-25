import express from 'express';
import { create, getAll, getById, remove, update } from '../controllers/post';

const postRouter = express.Router();

postRouter.post('/', create);
postRouter.get('/', getAll);
postRouter.get('/:id', getById);
postRouter.patch('/:id', update);
postRouter.delete('/:id', remove);

export default postRouter;