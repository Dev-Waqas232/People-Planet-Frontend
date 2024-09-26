import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  acceptRequest,
  cancelRequest,
  fetchFriends,
  removeFriend,
  sendRequest,
  suggestFriends,
} from './friendsActions';
import { ApiResponse, Friends, User } from '../../api/types';

type initialState = {
  friends: User[];
  friendRequestsReceived: User[];
  friendRequestsSent: User[];
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
  reducers: {
    filterSuggestFriends: (state, action) => {
      state.friendSuggestions = state.friendSuggestions.filter(
        (friend) => friend._id !== action.payload
      );
    },
    filterFriendRequestsReceived: (state, action) => {
      state.friendRequestsReceived = state.friendRequestsReceived.filter(
        (friend) => friend._id !== action.payload
      );
    },
  },
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
      })
      .addCase(sendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        sendRequest.fulfilled,
        (state, action: PayloadAction<ApiResponse<User[]>>) => {
          state.loading = false;
          state.friendRequestsSent = action.payload.data!;
        }
      )
      .addCase(sendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFriends.fulfilled,
        (state, action: PayloadAction<ApiResponse<Friends>>) => {
          state.loading = false;
          state.friends = action.payload.data!.friends;
          state.friendRequestsReceived =
            action.payload.data!.friendRequestsReceived;
          state.friendRequestsSent = action.payload.data!.friendRequestsSent;
        }
      )
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        cancelRequest.fulfilled,
        (state, action: PayloadAction<ApiResponse<{ friendId: string }>>) => {
          state.loading = false;
          state.friendRequestsReceived = state.friendRequestsReceived.filter(
            (friend) => friend._id !== action.payload.data?.friendId
          );
        }
      )
      .addCase(cancelRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(acceptRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        acceptRequest.fulfilled,
        (state, action: PayloadAction<ApiResponse<User[]>>) => {
          state.loading = false;
          state.friends = action.payload.data!;
        }
      )
      .addCase(acceptRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFriend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeFriend.fulfilled,
        (state, action: PayloadAction<ApiResponse<string>>) => {
          state.loading = false;
          state.friends = state.friends.filter(
            (friend) => friend._id !== action.payload.data
          );
        }
      )
      .addCase(removeFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default friendsSlice.reducer;
export const { filterSuggestFriends, filterFriendRequestsReceived } =
  friendsSlice.actions;
