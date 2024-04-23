import {
   ActionReducerMapBuilder,
   createAsyncThunk,
   createSlice,
} from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { newAxios, FetchStatus } from '../../../../shared/api'
import { EditAccountFormType, EditProfileSliceType } from '../types'

const initialState = {
   username: null,
   email: null,
   image: null,
   status: null,
}

export const getUser = createAsyncThunk(
   'editProfile/getUser',
   async (_, { rejectWithValue }) => {
      try {
         const res = await newAxios.get('user', {
            headers: {
               Authorization: `Bearer ${Cookies.get('token')}`,
            },
         })
         const { username, email, image } = res.data.user
         sessionStorage.setItem('blogUsername', username)
         newAxios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`
         return { username, email, image }
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const updateUser = createAsyncThunk(
   'editProfile/updateUser',
   async (data: EditAccountFormType, { rejectWithValue }) => {
      try {
         const res: any = await newAxios.put('user', {
            user: {
               username: data.username,
               email: data.email,
               password: data.password,
               image: data.image,
            },
         })
         const { username, email, image } = res

         return { username, email, image }
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

const editProfileSlice = createSlice({
   name: 'editProfile',
   initialState,
   reducers: {},
   extraReducers(builder: ActionReducerMapBuilder<EditProfileSliceType>) {
      builder
         .addCase(getUser.pending, (state) => {
            state.status = FetchStatus.Loading
         })
         .addCase(getUser.fulfilled, (state, action: any) => {
            state.status = FetchStatus.Resolved
            state.email = action.payload.email
            state.username = action.payload.username
            state.image = action.payload.image
         })
         .addCase(getUser.rejected, (state) => {
            state.status = FetchStatus.Rejected
         })
         .addCase(updateUser.pending, (state) => {
            state.status = FetchStatus.Loading
         })
         .addCase(updateUser.fulfilled, (state: any, action: any) => {
            state.username = action.payload.username
            state.image = action.payload.image
            state.email = action.payload.email
            state.status = FetchStatus.Resolved
         })
         .addCase(updateUser.rejected, (state) => {
            state.status = FetchStatus.Rejected
         })
   },
})

export default editProfileSlice.reducer
