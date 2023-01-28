import { axiosInstance, apiRequest } from './core/axios'

export const updateUser = async (data) => {
    return await apiRequest(() => axiosInstance.patch(`/user/${data.id}`, data))
}

export const resetPassword = async (code, data) => {
    return await apiRequest(() => axiosInstance.post(`/auth/reset_password/${code}`, data))
}
