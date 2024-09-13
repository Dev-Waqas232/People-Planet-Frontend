import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse, Post } from '../../api/types';
import { createPost } from './postActions';
import { toast } from 'react-toastify';

interface initialState {
  loading: boolean;
  error: string | null;
  post: Post | null;
  posts: Post[];
}

const initialState: initialState = {
  loading: false,
  error: null,
  post: null,
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(
        createPost.fulfilled,
        (state, action: PayloadAction<ApiResponse<Post>>) => {
          state.loading = false;
          state.post = action.payload.data!;
          toast.success('Post Created!');
        }
      )
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error);
      });
  },
});

export default postSlice.reducer;
