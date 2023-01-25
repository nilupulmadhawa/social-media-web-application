import asyncHandler from '../middleware/async'
import { authRegister, authLogin } from '../services/auth'
import { makeResponse } from '../utils/response'
import { sendTokenResponse } from '../utils/jwt'

export const register = asyncHandler(async (req, res) => {
    try {
        const result = await authRegister(req.body)
        if (!result) return makeResponse({ res, status: 500, message: 'Registration failed.' })
        if (result.status) return makeResponse({ res, ...result })
        return makeResponse({
            res,
            message: 'Registration Successfull.'
        })
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

export const login = asyncHandler(async (req, res) => {
    try {
        const user = await authLogin(req.body)
        if (!user) return makeResponse({ res, status: 401, message: 'Invalid email or password' })
        return sendTokenResponse(res, user, 'User logged in successfully')
    } catch (error) {
        return makeResponse({ res, status: 500, message: error.message });
    }
})

