import React, { useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cookies from 'js-cookie'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import HomePage from '../pages/HomePage'
import { PostPage } from '../pages/PostPage'
import { EditAccountPage } from '../pages/EditAccountPage'
import ErrorPage from '../pages/ErrorPage'
import { EditPostPage } from '../pages/EditPostPage'
import { CreatePostPage } from '../pages/CreatePostPage'
import { HeaderMenu } from '../shared/HeaderMenu'
import { newAxios } from '../shared/api'

const App = () => {
   useLayoutEffect(() => {
      if (Cookies.get('token')) {
         newAxios.defaults.headers.common['Authorization'] =
            `Bearer ${Cookies.get('token')}`
      }
   }, [])

   return (
      <BrowserRouter>
         <HeaderMenu />
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="articles/:page" element={<HomePage />} />
            <Route path="article/:id" element={<PostPage />} />
            <Route path="/new-article" element={<CreatePostPage />} />
            <Route path="articles/:id/edit" element={<EditPostPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/account-edit" element={<EditAccountPage />} />
            <Route path="*" element={<ErrorPage />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
