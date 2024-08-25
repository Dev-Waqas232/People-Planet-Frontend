import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, AuthResponse, User } from '../../api/types';
import {
  loginUser as loginApi,
  registerUser as registerApi,
} from '../../api/authApi';

export const loginUser = createAsyncThunk<
  ApiResponse<AuthResponse>, // Type of the response data
  { email: string; password: string }, // Type of the argument passed to the thunk
  { rejectValue: string } // Type of the reject value
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginApi(credentials);

    if (!response.ok) {
      return rejectWithValue(response.message);
    }
    return response;
  } catch (error: any) {
    console.error(error);
    return rejectWithValue('Failed to login');
  }
});

export const registerUser = createAsyncThunk<
  ApiResponse<User>,
  Partial<User>,
  { rejectValue: string }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await registerApi(userData);
    if (!response.ok) {
      return rejectWithValue(response.message);
    }
    return response;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue('Failed to register');
  }
});
