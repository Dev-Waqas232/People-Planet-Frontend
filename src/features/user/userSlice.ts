import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  changleProfilePic,
  getUser,
  requestResetPassword,
  resetPassword,
  updateUser,
} from './userActions';
import { ApiResponse, User } from '../../api/types';
import { toast } from 'react-toastify';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<ApiResponse<User>>) => {
          state.loading = false;
          state.user = action.payload.data!;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<ApiResponse<User>>) => {
          state.loading = false;
          state.user = action.payload.data!;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error);
      })
      .addCase(requestResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestResetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(requestResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error);
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changleProfilePic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        changleProfilePic.fulfilled,
        (state, action: PayloadAction<ApiResponse<User>>) => {
          state.loading = false;
          state.user = action.payload.data!;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      )
      .addCase(changleProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error);
      });
  },
});

export default userSlice.reducer;
