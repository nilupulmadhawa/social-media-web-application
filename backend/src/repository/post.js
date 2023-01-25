import Post from '../models/post'
import logger from '../utils/logger'

export const insertPost = async (post) => {
    const postMade = (await new Post(post).save()).toObject()
    return postMade
}

export const getAllPosts = async ({ sort = {}, filter = {}, page, limit = 10 }) => {
    const options = {
        page,
        limit,
        collation: {
            locale: 'en'
        }
    }

    if (Object.keys(sort).length > 0) options.sort = sort

    if (filter.post_count) {
        filter.posts = { $size: Number(filter.post_count) }
        delete filter.post_count
    }

    const aggregateQuery = () =>
        Post.aggregate([
            {
                $match: filter
            }
        ])

    return await (page ? Post.aggregatePaginate(aggregateQuery(), options) : aggregateQuery()).catch((err) => {
        logger.error(`An error occurred when retrieving posts - err: ${err.message}`)
        throw err
    })
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
