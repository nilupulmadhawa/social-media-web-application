import Post from '../models/post'
import logger from '../utils/logger'

export const insertPost = async (post) => {
    const postMade = (await new Post(post).save()).toObject()
    return postMade
}

export const getAllPosts = async ({ sort = { created_at: -1 }, filter = {}, page, limit = 0 }) => {
    const post = await Post.find(filter).sort(sort).skip(page * limit).limit(limit).populate('user_id').lean()
    if (!post) return null
    return post
}

export const getOnePost = async (filters) => {
    const post = await Post.findOne(filters).lean()
    if (!post) return null
    return post
}

export const findOneAndUpdatePost = async (filters, data) => {
    const post = await Post.findOneAndUpdate(filters, data, { new: true }).lean()
    if (!post) return null
    return post
}

export const findOneAndRemovePost = async (filters) => {
    return await Post.findOneAndRemove(filters)
}
