import React, { FC } from 'react'
import { CreateArticleFeature } from '../../features/CreatePost'
import Flex from '../../shared/ui/Flex'

export const CreatePostPage: FC = () => {
   return (
      <Flex $padding="0 0 50px 0">
         <CreateArticleFeature />
      </Flex>
   )
}
