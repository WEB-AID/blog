import React, { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { ArticleFormType } from '../../entities/PostForm/model/types'
import ArticleForm from '../../entities/PostForm'
import { editPost } from '../../entities/PostForm/model/slice'

const convertTagsForm = (tags: string[]) => tags.map((tag) => ({ value: tag }))

export const EditArticleFeature: FC = () => {
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const slug = useParams().id!
   const { isLogged } = useAppSelector((state) => state.signInForm)
   const { title, description, tagList, body }: any = useAppSelector(
      (state) => state.getAndDeletePost
   )

   useEffect(() => {
      if (!isLogged) navigate('/sign-in')
   }, [isLogged, navigate])

   const onSubmit = async (data: ArticleFormType) => {
      await dispatch(editPost({ slug, data }))
      navigate('/')
   }

   return (
      <ArticleForm
         onSubmit={onSubmit}
         defaultValues={{
            title: title || '',
            description: description || '',
            text: body || '',
            tags: tagList ? convertTagsForm(tagList) : [{ value: '' }],
         }}
      />
   )
}
