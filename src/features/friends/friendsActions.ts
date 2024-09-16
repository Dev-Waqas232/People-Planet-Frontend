import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, User } from '../../api/types';
import { getSuggestions as friendSuggestionsApi } from '../../api/friendsApi';

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
