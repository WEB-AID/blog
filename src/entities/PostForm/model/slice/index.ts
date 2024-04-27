import {
   ActionReducerMapBuilder,
   createAsyncThunk,
   createSlice,
} from '@reduxjs/toolkit'
import { FetchStatus } from '../../../../shared/api'
import { newAxios } from '../../../../shared/api'
import { ArticleFormType } from '../types'
import { convertTags } from '../../../../shared/helpers/convertTags'

export type CreateArticleStateType = {
   slug: string
   title: string
   description: string
   body: string
   tagList: string[]
   createdAt: string
   updatedAt: string
   favoritesCount: number
   username: string
   image: string
   status: FetchStatus | null
   error: boolean | null
   favorited: boolean | null
}

const initialState: CreateArticleStateType = {
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

export const createPost = createAsyncThunk(
   'createAndEditPost/createPost',
   async (data: ArticleFormType, { rejectWithValue }) => {
      const tags = convertTags(data)

      try {
         const res = await newAxios.post('articles', {
            article: {
               tagList: tags,
               title: data.title,
               description: data.description,
               body: data.text,
            },
         })
         return res
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const editPost = createAsyncThunk(
   'createAndEditPost/editPost',
   async (
      object: { slug: string; data: ArticleFormType },
      { rejectWithValue }
   ) => {
      const { description, text, title } = object.data
      const tagList = convertTags(object.data)
      try {
         const res = await newAxios.put(`articles/${object.slug}`, {
            article: { description, body: text, title, tagList: tagList },
         })
         const { status } = res.data
         return { status }
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

const createAndEditPostSlice = createSlice({
   name: 'createAndEditPost',
   initialState,
   reducers: {},
   extraReducers(builder: ActionReducerMapBuilder<CreateArticleStateType>) {
      builder
         .addCase(createPost.pending, (state) => {
            state.status = FetchStatus.Loading
         })
         .addCase(createPost.fulfilled, (state) => {
            state.status = FetchStatus.Resolved
         })
         .addCase(createPost.rejected, (state) => {
            state.status = FetchStatus.Rejected
         })
         .addCase(editPost.pending, (state) => {
            state.status = FetchStatus.Loading
         })
         .addCase(editPost.fulfilled, (state) => {
            state.status = FetchStatus.Resolved
         })
         .addCase(editPost.rejected, (state) => {
            state.status = FetchStatus.Rejected
         })
   },
})

export default createAndEditPostSlice.reducer
