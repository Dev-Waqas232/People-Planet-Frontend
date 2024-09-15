import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createPost as createPostApi,
  getPosts as getPostsApi,
} from '../../api/postApi';
import { ApiResponse, Post } from '../../api/types';

export const createPost = createAsyncThunk<
  ApiResponse<Post>,
  FormData,
  { rejectValue: string }
>('posts/createPost', async (formData, { rejectWithValue }) => {
  try {
    const response = await createPostApi(formData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const getPosts = createAsyncThunk<
  ApiResponse<Post[]>,
  string | undefined,
  { rejectValue: string }
>('posts/getPosts', async (userId, { rejectWithValue }) => {
  try {
    const response = await getPostsApi(userId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});
