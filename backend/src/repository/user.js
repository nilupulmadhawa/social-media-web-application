import User from '../models/user'
import logger from '../utils/logger'

export const createUser = async (user) => {
    const userMade = (await new User(user).save()).toObject()
    delete userMade.password
    return userMade
}

export const getAllUsers = async ({ sort = {}, filter = {}, page, limit = 10 }) => {
    const options = {
        page,
        limit,
        collation: {
            locale: 'en'
        }
    }

    if (Object.keys(sort).length > 0) options.sort = sort

    const aggregateQuery = () =>
        User.aggregate([
            {
                $match: filter
            },
            { $unset: ['password'] }
        ])

    return await (page ? User.aggregatePaginate(aggregateQuery(), options) : aggregateQuery()).catch((err) => {
        logger.error(`An error occurred when retrieving users - err: ${err.message}`)
        throw err
    })
}

export const getOneUser = async (filters, returnPassword = false) => {
    const user = await User.findOne(filters).lean()
    if (!user) return null

    if (!returnPassword) delete user.password
    return user
}

export const findOneAndUpdateUser = async (filters, data) => {
    const user = await User.findOneAndUpdate(filters, data, { new: true }).lean()
    if (!user) return null

    delete user.password
    return user
}

export const getAllUserIds = async (filters = {}) => {
    const users = await User.find(filters).select('_id').lean()
    return users.map((user) => user._id)
}


export const findOneAndRemoveUser = async (filters) => {
    return await User.findOneAndRemove(filters)
}
