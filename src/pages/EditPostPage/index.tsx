import React from 'react'
import { useParams } from 'react-router-dom'
import Flex from '../../shared/ui/Flex'
import { useAppSelector } from '../../shared/hooks'
import { CreateAndEditForm } from '../../widgets/CreateAndEditForm'

export const EditPostPage = () => {
   const slug = useParams().id!
   const { title, description, tagList, body }: any = useAppSelector(
      (state) => state.getAndDeletePost
   )

   return (
      <Flex $padding="0 0 50px 0">
         <CreateAndEditForm
            slug={slug}
            tags={tagList}
            body={body}
            description={description}
            title={title}
         />
      </Flex>
   )
}
