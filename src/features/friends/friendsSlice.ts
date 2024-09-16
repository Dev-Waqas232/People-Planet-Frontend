import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { suggestFriends } from './friendsActions';
import { ApiResponse, User } from '../../api/types';

type initialState = {
  friends: string[];
  friendRequestsReceived: string[];
  friendRequestsSent: string[];
  friendSuggestions: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: initialState = {
  error: null,
  friendRequestsReceived: [],
  friendRequestsSent: [],
  friends: [],
  friendSuggestions: [],
  loading: false,
  user: null,
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(suggestFriends.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        suggestFriends.fulfilled,
        (state, action: PayloadAction<ApiResponse<User[]>>) => {
          state.loading = false;
          state.friendSuggestions = action.payload.data!;
        }
      )
      .addCase(suggestFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default friendsSlice.reducer;
