import axiosInstance from '../utils/axiosInstance';
import { ApiResponse, AuthResponse, User } from './types';

export const registerUser = async (
  userData: Partial<User>
): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.post<ApiResponse<User>>(
    '/users/auth/register',
    userData
  );
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.post('/users/auth/login', credentials);
  return response.data;
};
