import {
   ActionReducerMapBuilder,
   createAsyncThunk,
   createSlice,
} from '@reduxjs/toolkit'
import { FetchStatus } from '../../../../shared/api'
import { newAxios } from '../../../../shared/api'
import { LikeSliceState } from '../types'

const initialState: LikeSliceState = {
   statusLike: null,
   statusDislike: null,
}

export const addLike = createAsyncThunk<any, string>(
   'likes/addLike',
   async (slug: string) => {
      try {
         const res = await newAxios.post(`articles/${slug}/favorite`)
         const { status } = res
         return { status }
      } catch (error) {
         return { error }
      }
   }
)

export const removeLike = createAsyncThunk(
   'likes/removeLike',
   async (slug: string) => {
      try {
         const res = await newAxios.delete(`articles/${slug}/favorite`)
         const { status } = res
         return { status }
      } catch (error) {
         return { error }
      }
   }
)

const likeSlice = createSlice({
   name: 'likes',
   initialState,
   reducers: {},
   extraReducers(builder: ActionReducerMapBuilder<LikeSliceState>) {
      builder
         .addCase(addLike.pending, (state) => {
            state.statusLike = FetchStatus.Loading
         })
         .addCase(addLike.fulfilled, (state) => {
            state.statusLike = FetchStatus.Resolved
         })
         .addCase(addLike.rejected, (state) => {
            state.statusLike = FetchStatus.Rejected
         })
         .addCase(removeLike.pending, (state) => {
            state.statusDislike = FetchStatus.Loading
         })
         .addCase(removeLike.fulfilled, (state) => {
            state.statusDislike = FetchStatus.Resolved
         })
         .addCase(removeLike.rejected, (state) => {
            state.statusDislike = FetchStatus.Rejected
         })
   },
})

export default likeSlice.reducer
