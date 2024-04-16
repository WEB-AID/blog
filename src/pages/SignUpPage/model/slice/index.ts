import { newAxios } from '../../../../shared/api'
import {
   ActionReducerMapBuilder,
   createAsyncThunk,
   createSlice,
} from '@reduxjs/toolkit'
import { FetchStatus } from '../../../../shared/api'
import { TypeFormData } from '../types'
import { CreateAccountSliceState } from '../types'

const initialState: CreateAccountSliceState = {
   isSuccessed: null,
   errorStatus: null,
   status: '',
   errors: {
      username: '',
      email: '',
   },
}

export const createUser = createAsyncThunk(
   'createAccount/createUser',
   async (data: TypeFormData, { rejectWithValue }) => {
      try {
         const res: any = await newAxios.post('users', {
            user: {
               username: data.username.toLowerCase() || '',
               email: data.email.toLowerCase() || '',
               password: data.password.toLowerCase() || '',
            },
         })
         return
      } catch (error: any) {
         return rejectWithValue(error.response.data.errors)
      }
   }
)

const createAccountSlice = createSlice({
   name: 'createAccount',
   initialState,
   reducers: {
      setSucceedFalse(state) {
         state.isSuccessed = false
      },
   },
   extraReducers(builder: ActionReducerMapBuilder<CreateAccountSliceState>) {
      builder
         .addCase(createUser.pending, (state) => {
            state.status = FetchStatus.Loading
         })
         .addCase(createUser.fulfilled, (state) => {
            state.isSuccessed = true
            state.status = FetchStatus.Resolved
         })
         .addCase(createUser.rejected, (state, action: any) => {
            state.status = FetchStatus.Rejected
            state.isSuccessed = false
            state.errors = action.payload
         })
   },
})

export default createAccountSlice.reducer
export const { setSucceedFalse } = createAccountSlice.actions
