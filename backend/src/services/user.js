import bcrypt from 'bcrypt'
import { findOneAndUpdateUser, findOneAndRemoveUser, getOneUser, getAllUsers } from '../repository/user'


export const getUsers = async (query) => {
    try {
        return await getAllUsers(query)
    } catch (error) {
        return error;
    }
}

export const getUserByID = async (id) => {
    try {
        const user = await getOneUser({ _id: id })
        if (!user)
            return {
                status: 422,
                message: 'User not found'
            }
        return user
    } catch (error) {
        return error;
    }
}

export const changePasswordService = async (user, oldPassword, newPassword) => {
    try {
        user = await getOneUser({ _id: user._id }, true) // because req.user doesn't have the password

        const isPasswordMatch = await new Promise((resolve, reject) => {
            bcrypt.compare(oldPassword, user.password, (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        })
        if (!isPasswordMatch) return { status: 400, message: 'Invalid current password' }

        const encryptedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        })
        return await findOneAndUpdateUser({ email: user.email }, { password: encryptedPassword })
    } catch (error) {
        return error;
    }
}

export const updateUserdetails = async (userId, userDetails) => {
    try {
        let userData
        if (userDetails.email) { delete userDetails.email }
        if (userDetails.password) { delete userDetails.password }
        if (userDetails.username) {
            userData = await getOneUser({ username: userDetails.username }, false)
            if (userData && userData?._id.toString() !== userId.toString()) return { status: 422, message: 'Username is already taken' }
        }

        const updatedUser = await findOneAndUpdateUser({ _id: userId }, userDetails)
        if (!updatedUser)
            return {
                status: 422,
                message: 'User not found'
            }
        return updatedUser
    } catch (error) {
        return error;
    }
}

export const deleteById = async (userId) => {
    try {
        const deleted = await findOneAndRemoveUser({ _id: userId })
        if (!deleted)
            return {
                status: 422,
                message: 'User not found'
            }
        return {
            status: 200,
            message: 'deleted successfully'
        }
    } catch (error) {
        return error;
    }
}


