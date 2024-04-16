import {
   createSlice,
   createAsyncThunk,
   ActionReducerMapBuilder,
   PayloadAction,
} from '@reduxjs/toolkit'
import { newAxios } from '../../../../shared/api'
import { postListState } from '../types'
import { FetchStatus } from '../../../../shared/api'

export const getPosts = createAsyncThunk<any, any>(
   'posts/getPosts',
   async (offsetValue) => {
      const res = await newAxios.get(`articles/?offset=${offsetValue}`)
      const { articles, articlesCount } = res.data
      return { posts: articles, postsCount: articlesCount }
   }
)

const initialState: postListState = {
   posts: [],
   status: null,
   error: null,
   postsCount: null,
   currentPage: 1,
}

const postListSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      setPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload
      },
   },
   extraReducers: (builder: ActionReducerMapBuilder<postListState>) => {
      builder
         .addCase(getPosts.pending, (state) => {
            state.status = FetchStatus.Loading
            state.error = false
         })
         .addCase(getPosts.fulfilled, (state, action) => {
            state.status = FetchStatus.Resolved
            state.error = false
            state.posts = action.payload.posts
            state.postsCount = action.payload.postsCount
         })
         .addCase(getPosts.rejected, (state) => {
            state.status = FetchStatus.Rejected
            state.error = true
         })
   },
})

export const { setPage } = postListSlice.actions
export default postListSlice.reducer
