import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import remarkGfm from 'remark-gfm'
import { format } from 'date-fns'
import { StyledMarkdown } from './ui'
import LikesButton from '../../widgets/LikesButton'
import { ModalDelete } from '../../widgets/ModalDelete'
import { useAppSelector } from '../../shared/hooks'
import { sliceText } from '../../shared/helpers/sliceText'
import { Span } from '../../shared/ui/Span'
import { Avatar } from '../../shared/ui/Avatar'
import Button from '../../shared/ui/Button'
import Flex from '../../shared/ui/Flex'
import { Tags } from '../../shared/ui/Tags'

const MAX_TAGS_DISPLAY = 4
const MAX_TITLE_LENGTH = 24
const MAX_DESCRIPTION_LENGTH = 160

export const RevealedPost = () => {
   const [showModal, setShowModal] = useState<boolean>(false)
   const { isLogged } = useAppSelector((state) => state.signInForm)
   const {
      username,
      title,
      image,
      createdAt,
      description,
      favoritesCount,
      tagList,
      body,
      slug,
      favorited,
   } = useAppSelector((state: any) => state.getAndDeletePost)
   const navigate = useNavigate()

   useEffect(() => {
      window.scrollTo({ top: 50 })
   }, [])

   const handleDelete = () => setShowModal(true)
   const handleClose = () => setShowModal(false)
   const handleNavigate = () => navigate(`/articles/${slug}/edit`)
   const tags = () => {
      return tagList
         .slice(0, MAX_TAGS_DISPLAY)
         .map((tag: string) => (
            <Tags key={nanoid()}>
               {sliceText(tag, { targetLength: 12, addDots: true })}
            </Tags>
         ))
   }

   return (
      <Flex $w="100%" $justify="center" $padding={'50px 0 50px 0'}>
         <Flex
            $h="auto"
            $w="80%"
            $bgcolor="#fff"
            $margin="20px 0 0 0"
            $padding="26px 16px 26px 16px"
            $dir="column"
            $borderRadius="0 7px 7px 0"
            $boxShadow="0 0 15px rgba(10, 1, 37, 0.1)"
         >
            <Flex $w="100%">
               <Flex $w="80%" $dir="column" $gap="5px">
                  <Flex $gap="10px" $w="100%" $align="center">
                     <Span $fz="20px" $color="#1890FF">
                        <span style={{ cursor: 'pointer' }}>
                           {sliceText(title, {
                              targetLength: MAX_TITLE_LENGTH,
                           })}
                        </span>
                     </Span>
                     <Flex $gap="5px" $align="center" $justify="center">
                        <LikesButton
                           isLogged={isLogged}
                           favoritesCount={favoritesCount}
                           favorited={favorited}
                           slug={slug}
                        />
                     </Flex>
                  </Flex>

                  <Flex $w="100%">{tags()}</Flex>
                  <Span $fz="12px">
                     {sliceText(description, {
                        targetLength: MAX_DESCRIPTION_LENGTH,
                        addDots: true,
                     })}
                  </Span>
               </Flex>
               <Flex $w="20%" $align="flex-end" $dir="column" $gap="10px">
                  <Flex $gap="10px">
                     <Flex $dir="column" $align="flex-end">
                        <Span
                           $textTransform="capitalize"
                           $fz="18px"
                           $color="rgb(0, 0, 0, 0.85)"
                        >
                           {username}
                        </Span>
                        <Span $fz="12px" $color="rgb(0, 0, 0, 0.5)">
                           {createdAt && format(createdAt, 'MMM, dd yyyy')}
                        </Span>
                     </Flex>

                     <Flex>
                        <Avatar src={image} alt="avatar" />
                     </Flex>
                  </Flex>
                  <Flex $gap="10px">
                     {username === sessionStorage.getItem('blogUsername') ? (
                        <>
                           <Button $outlined onClick={handleNavigate}>
                              Edit
                           </Button>
                           <Button
                              onClick={handleDelete}
                              $outlined
                              $color="red"
                           >
                              Delete
                           </Button>
                        </>
                     ) : null}
                  </Flex>
               </Flex>
            </Flex>
            <Flex
               $h="100%"
               $padding="20px 0 0 0"
               $dir="column"
               $gap="10px"
               $w="100%"
            >
               <StyledMarkdown remarkPlugins={[remarkGfm]}>
                  {body}
               </StyledMarkdown>
            </Flex>
         </Flex>
         <ModalDelete slug={slug} isShown={showModal} onClose={handleClose} />
      </Flex>
   )
}
