import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FetchStatus } from '../../../../shared/api'
import { newAxios } from '../../../../shared/api'
import Cookies from 'js-cookie'
import { isAxiosError } from 'axios'

type signInFormSliceState = {
   isLogged: boolean
   status: FetchStatus | ''
   isSucceed: boolean | 2
   isTokenExist: boolean
   username: string
   error: string
   image: string
   email: string
}

type TypeSignInFormData = {
   email: string
   password: string
}

const initialState: signInFormSliceState = {
   isLogged: Cookies.get('token') ? true : false,
   username: localStorage.getItem('BlogUsername') || '',
   status: '',
   isSucceed: 2,
   image: '',
   email: '',
   error: '',
   isTokenExist: false,
}

export const loginUser = createAsyncThunk<
   any,
   TypeSignInFormData,
   { rejectValue: string }
>('signInForm/loginUser', async (data, { rejectWithValue }) => {
   try {
      const res = await newAxios.post('users/login', {
         user: {
            email: data.email.toLowerCase(),
            password: data.password.toLowerCase(),
         },
      })

      const { token, username, email, image } = res.data.user
      Cookies.set('token', token)
      newAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return { token, username, email, image }
   } catch (error) {
      if (isAxiosError(error) && error?.response?.status === 422) {
         return rejectWithValue(error.response.data.errors['email or password'])
      }
   }
})

const signInFormSlice = createSlice({
   name: 'signInForm',
   initialState,
   reducers: {
      signOut(state) {
         state.isLogged = false
         state.isTokenExist = false
      },
      signIn(state) {
         state.isLogged = true
         state.isTokenExist = true
      },
      setDefaultSucceed(state) {
         state.isSucceed = 2
      },
   },
   extraReducers(builder) {
      builder
         .addCase(loginUser.pending, (state) => {
            state.status = FetchStatus.Loading
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            const { image, email, username } = action.payload
            state.isSucceed = true
            state.status = FetchStatus.Resolved
            state.isTokenExist = true
            state.username = username
            state.email = email
            state.image = image
            state.isLogged = true
         })
         .addCase(loginUser.rejected, (state, action) => {
            console.log(action)
            state.isSucceed = false
            state.error = action.payload || ''
            state.status = FetchStatus.Rejected
         })
   },
})

export default signInFormSlice.reducer
export const { signOut, signIn, setDefaultSucceed } = signInFormSlice.actions
