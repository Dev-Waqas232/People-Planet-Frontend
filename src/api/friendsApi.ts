import axiosInstance from '../utils/axiosInstance';
import { ApiResponse, User } from './types';

export const getSuggestions = async (): Promise<ApiResponse<User[]>> => {
  const response = await axiosInstance.get('/friends');

  return response.data;
};
