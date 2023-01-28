import { Joi } from 'celebrate'

export const addPostSchema = Joi.object({
    image_url: Joi.string().required(),
})

export const postViewSchema = {
    filter: Joi.object()
        .keys({
            created_at: Joi.string().hex().length(24).optional(),
            user_id: Joi.string().hex().length(24).optional(),
            updated_at: Joi.string().hex().length(24).optional()
        })
        .optional(),
    sort: Joi.object()
        .keys({
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