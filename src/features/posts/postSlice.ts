import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse, Post } from '../../api/types';
import { createPost, getPosts } from './postActions';
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
        state.loading = true;
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
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPosts.fulfilled,
        (state, action: PayloadAction<ApiResponse<Post[]>>) => {
          state.loading = false;
          state.posts = action.payload.data!;
        }
      )
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;
