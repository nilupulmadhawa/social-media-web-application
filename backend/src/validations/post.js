import { Joi } from 'celebrate'

export const addPostSchema = Joi.object({
    image_url: Joi.string().required(),
})

export const postViewSchema = {
    filter: Joi.object()
        .keys({
            question: Joi.string().hex().length(24).optional(),
            user: Joi.string().hex().length(24).optional(),
            graded_by: Joi.string().hex().length(24).optional()
        })
        .optional(),
    sort: Joi.object()
        .keys({
            score: Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional(),
            created_at: Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional(),
            updated_at: Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional()
        })
        .optional(),
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    likes: Joi.number().optional()
}

export const postIdSchema = {
    id: Joi.string().hex().length(24).required()
}