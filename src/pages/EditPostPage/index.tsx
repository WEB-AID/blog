import React, { FC } from 'react'
import Flex from '../../shared/ui/Flex'
import { EditPostWidget } from '../../widgets/EditPostWidget'

export const EditPostPage: FC = () => {
   return (
      <Flex $padding="0 0 50px 0">
         <EditPostWidget />
      </Flex>
   )
}
