import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from './model/slice'
import { RevealedPost } from '../../entities/RevealedPost'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { FetchStatus } from '../../shared/api'
import Flex from '../../shared/ui/Flex'
import { Loader } from '../../shared/ui/Loader'

export const PostPage = () => {
   const { id } = useParams()
   const dispatch = useAppDispatch()
   const { status } = useAppSelector((state) => state.getAndDeletePost)

   useEffect(() => {
      dispatch(getPost(id))
   }, [dispatch, id])

   if (status === FetchStatus.Loading) {
      return (
         <Flex $w="100%" $h="100vh" $justify="center" $align="center">
            <Loader />
         </Flex>
      )
   } else if (status === FetchStatus.Resolved) {
      return (
         <Flex
            $w="100%"
            $h="100%"
            $padding="100px 0 0 0"
            $justify="center"
            $align="center"
         >
            <RevealedPost />
         </Flex>
      )
   }

   return null
}
