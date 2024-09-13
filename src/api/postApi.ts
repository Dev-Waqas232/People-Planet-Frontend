import axiosInstance from '../utils/axiosInstance';
import { ApiResponse, Post } from './types';

export const createPost = async (
  postData: FormData
): Promise<ApiResponse<Post>> => {
  const response = await axiosInstance.post<ApiResponse<Post>>(
    '/posts',
    postData
  );
  return response.data;
};
