import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../shared/hooks'
import { createPost } from '../../entities/PostForm/model/slice'
import { ArticleFormType } from '../../entities/PostForm/model/types'
import ArticleForm from '../../entities/PostForm'

export const CreateArticleFeature: FC = () => {
   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   const onSubmit = async (data: ArticleFormType) => {
      if (data.tags![0].value === '') {
         delete data.tags
      }
      await dispatch(createPost(data))
      navigate('/')
   }

   return (
      <ArticleForm
         onSubmit={onSubmit}
         defaultValues={{
            title: '',
            description: '',
            text: '',
            tags: [{ value: '' }],
         }}
      />
   )
}
