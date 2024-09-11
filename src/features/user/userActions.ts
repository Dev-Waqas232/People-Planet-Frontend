import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, User } from '../../api/types';
import {
  getUser as getUserApi,
  updateUser as updateUserApi,
  requestResetPassword as requestResetApi,
  resetPassword as resetPasswordApi,
  changleProfilePic as profilePicApi,
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

export const requestResetPassword = createAsyncThunk<
  ApiResponse<User>,
  string,
  { rejectValue: string }
>('user/requestResetPassword', async (email, { rejectWithValue }) => {
  try {
    const response = await requestResetApi(email);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const resetPassword = createAsyncThunk<
  ApiResponse<User>,
  { password: string; token: string },
  { rejectValue: string }
>('user/resetPassword', async ({ password, token }, { rejectWithValue }) => {
  try {
    const response = await resetPasswordApi({ password, token });
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const changleProfilePic = createAsyncThunk<
  ApiResponse<User>,
  { profileId: string; formData: FormData },
  { rejectValue: string }
>('user/profilePic', async ({ profileId, formData }, { rejectWithValue }) => {
  try {
    const response = await profilePicApi(formData, profileId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});
