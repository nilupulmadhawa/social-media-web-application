import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const PostSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        image_url: {
            type: String,
            required: true
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }],
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

PostSchema.plugin(aggregatePaginate)

PostSchema.index({ createdAt: 1 })

const Post = mongoose.model('Post', PostSchema)

Post.syncIndexes()

export default Post
