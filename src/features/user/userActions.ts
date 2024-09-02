import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, User } from '../../api/types';
import {
  getUser as getUserApi,
  updateUser as updateUserApi,
} from '../../api/userApi';

export const getUser = createAsyncThunk<
  ApiResponse<User>,
  string,
  { rejectValue: string }
>('user/getUser', async (profileId, { rejectWithValue }) => {
  try {
    const response = await getUserApi(profileId);
    console.log(response);
    if (!response.ok) {
      return rejectWithValue(response.message);
    }
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const updateUser = createAsyncThunk<
  ApiResponse<User>,
  { profileId: string; data: User },
  { rejectValue: string }
>('user/updateUser', async ({ profileId, data }, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(profileId, data);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});
