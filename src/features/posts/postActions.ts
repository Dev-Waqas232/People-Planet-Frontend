import { createAsyncThunk } from '@reduxjs/toolkit';

import { createPost as createPostApi } from '../../api/postApi';
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
