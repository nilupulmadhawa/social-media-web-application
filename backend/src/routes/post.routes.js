import express from 'express';
import { create, getAll, getMyPost, getById, remove, update, like } from '../controllers/post';

const postRouter = express.Router();

postRouter.post('/', create);
postRouter.get('/', getAll);
postRouter.get('/my', getMyPost);
postRouter.get('/:id', getById);
postRouter.patch('/:id', update);
postRouter.delete('/:id', remove);
postRouter.patch('/:id/like', like);

export default postRouter;