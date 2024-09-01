import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, User } from '../../api/types';
import { getUser as getUserApi } from '../../api/userApi';

export const getUser = createAsyncThunk<
  ApiResponse<User>,
  string,
  { rejectValue: string }
>('user/getUser', async (profileId, { rejectWithValue }) => {
  try {
    const response = await getUserApi(profileId);
    if (!response.ok) {
      return rejectWithValue(response.message);
    }
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});
