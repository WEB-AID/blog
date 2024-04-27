import React, { FC } from 'react'
import Flex from '../../shared/ui/Flex'
import { EditArticleFeature } from '../../features/EditPost'

export const EditPostPage: FC = () => {
   return (
      <Flex $padding="0 0 50px 0">
         <EditArticleFeature />
      </Flex>
   )
}
