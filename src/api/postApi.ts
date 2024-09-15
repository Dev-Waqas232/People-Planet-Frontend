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

export const getPosts = async (
  userId?: string
): Promise<ApiResponse<Post[]>> => {
  let response;
  if (userId) {
    response = await axiosInstance.get(`/posts/${userId}`);
  } else {
    response = await axiosInstance.get(`/posts`);
  }
  return response.data;
};
