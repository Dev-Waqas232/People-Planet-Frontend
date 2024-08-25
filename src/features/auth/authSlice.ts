import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authActions';
import { ApiResponse, AuthResponse, User } from '../../api/types';
import { toast } from 'react-toastify';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token') as string)
    : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      const user = JSON.parse(localStorage.getItem('user') as string);
      if (user) {
        state.user = user;
        state.token = JSON.parse(localStorage.getItem('token') as string);
      }
    },
    logout: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<ApiResponse<AuthResponse>>) => {
          state.loading = false;
          if (action.payload.ok) {
            state.user = action.payload.data!.user;
            state.token = action.payload.data!.token;
            localStorage.setItem('token', JSON.stringify(state.token));
            localStorage.setItem('user', JSON.stringify(state.user));
          } else {
            state.error = action.payload.message;
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error);
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error);
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
