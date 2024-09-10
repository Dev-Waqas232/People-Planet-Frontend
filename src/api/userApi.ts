import axiosInstance from '../utils/axiosInstance';
import { ApiResponse, User } from './types';

export const getUser = async (
  profileId: string
): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.get<ApiResponse<User>>(
    `/users/${profileId}`
  );
  return response.data;
};

export const updateUser = async (
  profileId: string,
  data: User
): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.put(`/users/${profileId}`, data);

  return response.data;
};

export const requestResetPassword = async (
  email: string
): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.post('/users/auth/request-reset', {
    email,
  });
  return response.data;
};

export const resetPassword = async (data: {
  password: string;
  token: string;
}): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.post('/users/auth/reset-password', data);
  return response.data;
};
