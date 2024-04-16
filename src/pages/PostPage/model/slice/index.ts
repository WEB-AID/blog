import {
   ActionReducerMapBuilder,
   createAsyncThunk,
   createSlice,
} from '@reduxjs/toolkit'
import { FetchStatus } from '../../../../shared/api'
import { newAxios } from '../../../../shared/api'
import { PostPageState } from '../types'

const initialState: PostPageState = {
   slug: '',
   title: '',
   description: '',
   body: '',
   tagList: [],
   createdAt: '',
   updatedAt: '',
   favoritesCount: 0,
   username: '',
   image: '',
   status: null,
   error: null,
   favorited: null,
}

export const getPost: any = createAsyncThunk(
   'getAndDeletePost/getPost',
   async (slugText: string, { rejectWithValue }) => {
      try {
         const res: any = await newAxios.get(`articles/${slugText}`)
         const { title, description, tagList, body, slug, author, ...rest } =
            res.data.article
         const { username, image } = author

         return {
            ...rest,
            username,
            image,
            title,
            description,
            tagList,
            body,
            slug,
         }
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const deletePost = createAsyncThunk(
   'getAndDeletePost/deletePost',
   async (slug: string, { rejectWithValue }) => {
      try {
         const res = await newAxios.delete(`articles/${slug}`)
         return res
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

const getAndDeletePostSlice = createSlice({
   name: 'getAndDeletePost',
   initialState,
   reducers: {},
   extraReducers(builder: ActionReducerMapBuilder<PostPageState>) {
      builder
         .addCase(deletePost.pending, (state) => {
            state.status = FetchStatus.Loading
         })
         .addCase(deletePost.fulfilled, (state) => {
            state.status = FetchStatus.Resolved
         })
         .addCase(deletePost.rejected, (state) => {
            state.status = FetchStatus.Rejected
         })
         .addCase(getPost.pending, (state) => {
            state.status = FetchStatus.Loading
         })
         .addCase(getPost.fulfilled, (state, action) => {
            Object.assign(state, action.payload)
            state.status = FetchStatus.Resolved
            state.error = false
         })
         .addCase(getPost.rejected, (state) => {
            state.status = FetchStatus.Rejected
         })
   },
})

export default getAndDeletePostSlice.reducer
