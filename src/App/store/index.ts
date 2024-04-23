//@ts-nocheck
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import postListSlice from '../../pages/HomePage/model/slice'
import getAndDeletePostSlice from '../../pages/PostPage/model/slice'
import signUpSlice from '../../pages/SignUpPage/model/slice'
import signInSlice from '../../pages/SignInPage/model/slice'
import editProfileSlice from '../../pages/EditAccountPage/model/slice'
import createAndEditPostSlice from '../../entities/CreateAndEditForm/model/slice'
import likesSlice from '../../widgets/LikesButton/model/slice'
import {
   createStateSyncMiddleware,
   initMessageListener,
} from 'redux-state-sync'

const rootReducer = combineReducers({
   posts: postListSlice,
   getAndDeletePost: getAndDeletePostSlice,
   createAndEditPost: createAndEditPostSlice,
   signUpForm: signUpSlice,
   signInForm: signInSlice,
   editProfile: editProfileSlice,
   likes: likesSlice,
})

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }).concat(createStateSyncMiddleware()),
})

initMessageListener(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
