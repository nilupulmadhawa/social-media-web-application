import { insertPost, findOneAndUpdatePost, findOneAndRemovePost, getOnePost, getAllPosts } from '../repository/post'

export const createPost = async (data, user) => {
    data = { ...data, user_id: user._id }
    return await insertPost(data)
}

export const getPosts = async (query) => {
    try {
        return await getAllPosts(query)
    } catch (error) {
        return error;
    }
}

export const getPostByID = async (id) => {
    try {
        const post = await getOnePost({ _id: id })
        if (!post)
            return {
                status: 422,
                message: 'Post not found'
            }
        return post
    } catch (error) {
        return error;
    }
}

export const updatePostdetails = async (postId, postDetails) => {
    try {
        const updatedPost = await findOneAndUpdatePost({ _id: postId }, postDetails)
        if (!updatedPost)
            return {
                status: 422,
                message: 'Post not found'
            }
        return updatedPost
    } catch (error) {
        return error;
    }
}

export const deleteById = async (postId) => {
    try {
        const deleted = await findOneAndRemovePost({ _id: postId })
        if (!deleted)
            return {
                status: 422,
                message: 'Post not found'
            }
        return {
            status: 200,
            message: 'deleted successfully'
        }
    } catch (error) {
        return error;
    }
}

export const likePost = async (postId, userId) => {
    try {
        const post = await getOnePost({ _id: postId })
        if (!post.likes.some(p => p.toString() == userId.toString())) {
            await updatePostdetails({ _id: postId }, { $push: { likes: userId } });
            return {
                status: 200,
                message: 'The post has been liked'
            }
        } else {

            await updatePostdetails({ _id: postId }, { $pull: { likes: userId } });
            return {
                status: 200,
                message: 'The post has been disliked'
            }
        }
    } catch (err) {
        return err;
    }
}
