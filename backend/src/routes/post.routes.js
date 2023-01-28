import express from 'express';
import { create, getAll, getMyPost, getById, remove, update, like } from '../controllers/post';

import { celebrate, Segments } from 'celebrate'


import { addPostSchema, postViewSchema, postIdSchema } from '../validations/post';

const postRouter = express.Router();

postRouter.post('/', celebrate({ [Segments.BODY]: addPostSchema }), create);
postRouter.get('/', celebrate({ [Segments.QUERY]: postViewSchema }), getAll);
postRouter.get('/my', celebrate({ [Segments.QUERY]: postViewSchema }), getMyPost);
postRouter.get('/:id', celebrate({ [Segments.PARAMS]: postIdSchema }), getById);
postRouter.patch('/:id', celebrate({ [Segments.PARAMS]: postIdSchema }), update);
postRouter.delete('/:id', celebrate({ [Segments.PARAMS]: postIdSchema }), remove);
postRouter.patch('/:id/like', celebrate({ [Segments.PARAMS]: postIdSchema }), like);

export default postRouter;