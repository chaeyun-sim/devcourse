import { FormData } from '@/pages/Signup'
import { requestHandler } from './http'

export const signup = async (userData: FormData) => {
  return await requestHandler('post', '/users/signup', userData)
}

export const resetRequest = async (data: FormData) => {
  return await requestHandler('post', '/users/reset', data)
}

export const resetPassword = async (data: FormData) => {
  return await requestHandler('put', '/users/reset', data)
}

interface LoginResponse {
  token: string
}

interface LoginData {
  email: string
  password: string
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  return await requestHandler<LoginResponse>('post', '/users/login', data)
}