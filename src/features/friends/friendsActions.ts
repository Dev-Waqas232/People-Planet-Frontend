import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, Friends, User } from '../../api/types';
import {
  getSuggestions as friendSuggestionsApi,
  sendFriendRequest as sendRequestApi,
  fetchFriends as fetchFriendsApi,
  cancelRequest as cancelRequestApi,
  acceptFriend as acceptFriendApi,
  removeFriend as removeFriendApi,
} from '../../api/friendsApi';

export const suggestFriends = createAsyncThunk<
  ApiResponse<User[]>,
  void,
  { rejectValue: string }
>('friends/suggestFriends', async (_, { rejectWithValue }) => {
  try {
    const response = await friendSuggestionsApi();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const sendRequest = createAsyncThunk<
  ApiResponse<User[]>,
  string,
  { rejectValue: string }
>('friends/sendRequest', async (friendId, { rejectWithValue }) => {
  try {
    const response = await sendRequestApi(friendId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchFriends = createAsyncThunk<
  ApiResponse<Friends>,
  void,
  { rejectValue: string }
>('friends/fetchFriends', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchFriendsApi();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const cancelRequest = createAsyncThunk<
  ApiResponse<{ friendId: string }>,
  string,
  { rejectValue: string }
>('friends/cancelRequest', async (friendId, { rejectWithValue }) => {
  try {
    const response = await cancelRequestApi(friendId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const acceptRequest = createAsyncThunk<
  ApiResponse<User[]>,
  string,
  { rejectValue: string }
>('friends/acceptRequest', async (friendId, { rejectWithValue }) => {
  try {
    const response = await acceptFriendApi(friendId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const removeFriend = createAsyncThunk<
  ApiResponse<string>,
  string,
  { rejectValue: string }
>('friends/removeFriend', async (friendId, { rejectWithValue }) => {
  try {
    const response = await removeFriendApi(friendId);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});
