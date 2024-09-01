import axiosInstance from '../utils/axiosInstance';
import { ApiResponse, User } from './types';

export const getUser = async (
  profileId: string
): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.get<ApiResponse<User>>(
    `http://localhost:5000/api/users/${profileId}`
  );
  return response.data;
};
