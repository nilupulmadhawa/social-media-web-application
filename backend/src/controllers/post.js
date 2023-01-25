import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import { createPost, getPosts, getPostByID, updatePostdetails, deleteById } from '../services/post'

export const create = asyncHandler(async (req, res) => {
    const result = await createPost(req.body, req.user)
    if (!result) return makeResponse({ res, status: 500, message: 'Failed to add post' })
    if (result.status) return makeResponse({ res, ...result })
    return makeResponse({ res, message: 'Post added successfully' })
})

export const getAll = asyncHandler(async (req, res) => {
    try {
        const posts = await getPosts(req.query)
        return makeResponse({ res, status: 200, data: posts, message: 'Posts retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getById = asyncHandler(async (req, res) => {
    try {
        const ret = await getPostByID(req.params.id)
        if (ret.status) return makeResponse({ res, ...ret })
        return makeResponse({ res, status: 200, data: ret, message: 'Post retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const update = asyncHandler(async (req, res) => {
    try {
        const ret = await getPostByID(req.params.id)
        if (ret.status) return makeResponse({ res, ...ret })
        if (ret.user_id.toString() !== req.user._id.toString()) return makeResponse({ res, status: 401, message: 'Unauthorized' })
        const result = await updatePostdetails(req.params.id, req.body)
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to update post' })
        if (result.status) return makeResponse({ res, ...result })
        return makeResponse({ res, status: 200, data: result, message: 'Post updated successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const remove = asyncHandler(async (req, res) => {
    try {
        const ret = await getPostByID(req.params.id)
        if (ret.status) return makeResponse({ res, ...ret })
        if (ret.user_id.toString() !== req.user._id.toString()) return makeResponse({ res, status: 401, message: 'Unauthorized' })
        const result = await deleteById(req.params.id)
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to delete post' })
        if (result.status) return makeResponse({ res, ...result })
        return makeResponse({ res, status: 200, data: result, message: 'Post deleted successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

