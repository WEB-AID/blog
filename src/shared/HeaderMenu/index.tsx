import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { signOut } from '../../pages/SignInPage/model/slice'
import { getUser } from '../../pages/EditAccountPage/model/slice'
import { ProfileAvatar, Logo, LogoSpan } from './ui'
import { useAppDispatch, useAppSelector } from '../hooks'
import { newAxios } from '../../shared/api'
import defaultAvatar from '../../shared/assets/avatarDefault.png'
import logoImg from '../../shared/assets/logo-earth-blue.svg'
import Button from '../../shared/ui/Button'
import Flex from '../../shared/ui/Flex'
import { Span } from '../../shared/ui/Span'

export const HeaderMenu = () => {
   const { isLogged } = useAppSelector((state) => state.signInForm)
   const { image, username } = useAppSelector((state) => state.editProfile)
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const { pathname } = useLocation()
   const cachedUsername = sessionStorage.getItem('blogUsername')

   useEffect(() => {
      if (isLogged) dispatch(getUser())
   }, [dispatch, isLogged])

   const handleNavigate = () => {
      if (pathname !== '/account-edit') {
         navigate('/account-edit')
      }
   }
   const handleLogOut = () => {
      Cookies.remove('token')
      newAxios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get(
         'token'
      )}`
      dispatch(signOut())
      navigate('/')
   }

   return (
      <Flex
         $zIndex="1000"
         $position="fixed"
         $w="100%"
         $h="80px"
         $bgcolor="white"
         $align="center"
         $justify="space-between"
         $boxShadow="0 0 10px rgb(0, 39, 51, 0.2)"
      >
         <Flex $padding="0 0 0 20px">
            <Span $fw="400" $fz="20px">
               <Logo to={'./'}>
                  <LogoSpan>RealWorld Blog</LogoSpan>
                  <div>
                     <img src={logoImg} alt="" />
                  </div>
               </Logo>
            </Span>
         </Flex>
         <Flex $gap="20px" $padding="0 20px 0 0" $align="center">
            {isLogged ? (
               <>
                  <Button
                     onClick={() => navigate('/new-article')}
                     $stretched
                     $color="lightgreen"
                  >
                     Create Article
                  </Button>
                  <Span $fz="20px">{username || cachedUsername}</Span>
                  <ProfileAvatar
                     width={'30px'}
                     height={'30px'}
                     id="avatar"
                     src={image || defaultAvatar}
                     onError={(e: any) => (e.target.src = defaultAvatar)}
                     onClick={handleNavigate}
                  />
                  <Button $outlined $color="red" onClick={handleLogOut}>
                     Log Out
                  </Button>
               </>
            ) : (
               <>
                  <Button onClick={() => navigate('./sign-in')}>Sign in</Button>
                  <Button
                     $outlined
                     $background="#fff"
                     onClick={() => navigate('./sign-up')}
                  >
                     Sign up
                  </Button>
               </>
            )}
         </Flex>
      </Flex>
   )
}
