import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import { PostProps } from './types'
import LikesButton from '../../widgets/LikesButton'
import { sliceText } from '../../shared/helpers/sliceText'
import defaultAvatar from '../../shared/assets/avatarDefault.png'
import { Avatar } from '../../shared/ui/Avatar'
import Flex from '../../shared/ui/Flex'
import { Span } from '../../shared/ui/Span'
import { useAppSelector } from '../../shared/hooks'
import { StyledLi, Tags } from '../../shared/ui/Tags'

const MAX_TAGS_DISPLAY = 4
const MAX_TITLE_LENGTH = 24
const MAX_DESCRIPTION_LENGTH = 200

export const Post: FC<PostProps> = ({
   username,
   img,
   title,
   description,
   tagList,
   slug,
   favoritesCount,
   createdAt,
   favorited,
}: any) => {
   const { isLogged } = useAppSelector((state) => state.signInForm)
   let navigate = useNavigate()

   const handleClick = () => {
      navigate(`/article/${slug}`)
   }

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
      <StyledLi>
         <Flex
            $borderRadius="0 7px 7px 0"
            $w="100%"
            $h="140px"
            $gap="26px"
            $bgcolor="white"
            $padding="20px"
         >
            <Flex $dir="column" $w="60%">
               <Flex $dir="column" $gap="5px">
                  <Flex $gap="10px" $w="100%" $align="center">
                     <Span $fz="20px" $color="#1890FF">
                        <span
                           style={{ cursor: 'pointer' }}
                           onClick={handleClick}
                        >
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
            </Flex>
            <Flex $ml="auto" $w="40" $gap="10px">
               <Flex $dir="column" $align="flex-end">
                  <Span
                     $textTransform="capitalize"
                     $fz="18px"
                     $color="rgb(0, 0, 0, 0.85)"
                  >
                     {username}
                  </Span>
                  <Span $fz="12px" $color="rgb(0, 0, 0, 0.5)">
                     {format(createdAt, 'MMM, dd yyyy')}
                  </Span>
               </Flex>
               <Flex>
                  <Avatar
                     src={img}
                     alt="avatar"
                     onError={(e: any) => (e.target.src = defaultAvatar)}
                  />
               </Flex>
            </Flex>
         </Flex>
      </StyledLi>
   )
}
