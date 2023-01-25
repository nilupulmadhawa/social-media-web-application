import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import { getUsers, getUserByID, updateUserdetails, deleteById, changePasswordService } from '../services/user'


export const getAll = asyncHandler(async (req, res) => {
    try {
        const users = await getUsers(req.query)
        return makeResponse({ res, status: 200, data: users, message: 'Users retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const getById = asyncHandler(async (req, res) => {
    try {
        const ret = await getUserByID(req.params.id)
        if (ret.status) return makeResponse({ res, ...ret })
        return makeResponse({ res, status: 200, data: ret, message: 'User retrieved succesfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const update = asyncHandler(async (req, res) => {
    try {
        const result = await updateUserdetails(req.user._id, req.body)
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to update user' })
        if (result.status) return makeResponse({ res, ...result })
        return makeResponse({ res, status: 200, data: result, message: 'User updated successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const remove = asyncHandler(async (req, res) => {
    try {
        const result = await deleteById(req.user._id)
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to delete user' })
        if (result.status) return makeResponse({ res, ...result })
        return makeResponse({ res, status: 200, data: result, message: 'User deleted successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const changePassword = asyncHandler(async (req, res) => {
    try {
        const result = await changePasswordService(req.user, req.body.old_password, req.body.new_password)
        if (!result) return makeResponse({ res, status: 500, message: 'Failed to change password' })
        if (result.status) return makeResponse({ res, ...result })
        return makeResponse({ res, message: 'Password changed successfully' })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})
