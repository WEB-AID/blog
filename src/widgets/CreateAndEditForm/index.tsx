import React, { FC, useEffect } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createPost, editPost } from './model/slice'
import { ArticleFormType, EditPostProps } from './model/types'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import Button from '../../shared/ui/Button'
import Flex from '../../shared/ui/Flex'
import { Form } from '../../shared/ui/Form'
import { Input } from '../../shared/ui/Input'
import { Span } from '../../shared/ui/Span'
import { TextArea } from '../../shared/ui/TextArea'

function convertTags(tags: string[]): { value: string }[] {
   return tags.map((tag) => ({ value: tag }))
}

const MAX_TAGS = 5
const MAX_TAG_LENGTH = 14

export const CreateAndEditForm: FC<EditPostProps> = ({
   slug,
   title,
   description,
   body,
   tags,
}) => {
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const { isLogged } = useAppSelector((state) => state.signInForm)

   const {
      control,
      register,
      handleSubmit,
      setValue,
      formState: { errors, isDirty },
   } = useForm<ArticleFormType>({
      mode: 'onChange',
      shouldFocusError: true,
      defaultValues: {
         tags: [{ value: '' }],
      },
   })
   const { fields, append, remove } = useFieldArray({
      name: 'tags',
      control,
   })

   useEffect(() => {
      if (!isLogged) navigate('/sign-in')
      if (isLogged && slug) {
         setValue('title', title || '')
         setValue('description', description || '')
         setValue('text', body || '')
         setValue('tags', tags ? convertTags(tags) : [{ value: '' }])
      }
   }, [navigate, isLogged, slug, setValue, title, description, body, tags])

   const onSubmit = async (data: ArticleFormType) => {
      if (!slug) {
         if (data.tags![0].value === '') delete data.tags
         await dispatch(createPost(data))
      } else {
         await dispatch(editPost({ slug, data }))
      }
      navigate('/')
   }

   const tagList = fields.map((field: Record<'id', string>, index) => {
      return (
         <Flex
            key={field.id}
            $gap={'10px'}
            $align={'flex-end'}
            $margin={'0 0 1px 0'}
         >
            <Input
               {...register(`tags.${index}.value`, { maxLength: 14 })}
               placeholder="Tag"
               $err={errors.tags ? errors.tags[index] : errors.tags}
               $w="150px"
            >
               Tag
            </Input>

            <Flex $gap="10px" $margin="0 0 1px 0">
               {fields.length > 1 ? (
                  <Button
                     type="button"
                     onClick={() => remove(index)}
                     $outlined
                     $color="red"
                  >
                     Delete
                  </Button>
               ) : (
                  ''
               )}
            </Flex>
            <>
               {errors.tags && errors.tags[index] && (
                  <span key={nanoid()} style={{ color: 'red' }}>
                     Cant be longer than {MAX_TAG_LENGTH} characters!
                  </span>
               )}
            </>
         </Flex>
      )
   })

   const renderAddButton = () => {
      return (
         fields.length < MAX_TAGS && (
            <Button onClick={() => append({ value: '' })} $outlined>
               Add
            </Button>
         )
      )
   }

   return (
      <Flex $padding="150px 0 0 0" $w="100%" $align="center" $justify="center">
         <Form $gap="20px" $w="80%" onSubmit={handleSubmit(onSubmit)}>
            <Span $fz="20px" $justify="center" $padding="10px">
               {title ? 'Edit Article' : 'Create New Article'}
            </Span>

            <Input
               $err={errors.title}
               {...register('title', { required: true, maxLength: 40 })}
               placeholder="Title"
            >
               Title
            </Input>
            {errors.title && (
               <span
                  style={{
                     color: 'red',
                     fontSize: '12px',
                     wordBreak: 'break-word',
                  }}
               >
                  Title can`t be empty or contain more than 40 characters
               </span>
            )}
            <Input
               $err={errors.description}
               {...register('description', {
                  required: true,
                  maxLength: 150,
               })}
               placeholder="Short description"
            >
               Short description
            </Input>
            {errors.description && (
               <span
                  style={{
                     color: 'red',
                     fontSize: '12px',
                     wordBreak: 'break-word',
                  }}
               >
                  Description can`t be empty or contain more than 150 characters
               </span>
            )}
            <TextArea
               $err={errors.text}
               {...register('text', { required: true, maxLength: 8000 })}
               placeholder="Text ..."
            >
               Text
            </TextArea>
            {errors.text && (
               <span
                  style={{
                     color: 'red',
                     fontSize: '12px',
                     wordBreak: 'break-word',
                  }}
               >
                  Article text can`t be empty or contain more than 8000
                  characters
               </span>
            )}
            <Flex $gap="10px" $dir={'column'}>
               <>{tagList}</>
               <>{renderAddButton()}</>
            </Flex>
            <Button disabled={!isDirty} type="submit" $w="200px" $stretched>
               Send
            </Button>
         </Form>
      </Flex>
   )
}
