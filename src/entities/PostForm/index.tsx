import React, { FC } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import Button from '../../shared/ui/Button'
import Flex from '../../shared/ui/Flex'
import { ArticleFormType } from './model/types'
import { nanoid } from '@reduxjs/toolkit'
import { Input } from '../../shared/ui/Input'
import { Form } from '../../shared/ui/Form'
import { TextArea } from '../../shared/ui/TextArea'

interface ArticleFormProps {
   onSubmit: (data: ArticleFormType) => void
   defaultValues: ArticleFormType
}

const MAX_TAGS = 5
const MAX_TAG_LENGTH = 14

const ArticleForm: FC<ArticleFormProps> = ({ onSubmit, defaultValues }) => {
   const {
      control,
      register,
      handleSubmit,
      formState: { errors, isDirty },
   } = useForm<ArticleFormType>({
      defaultValues,
   })

   const { fields, append, remove } = useFieldArray({
      name: 'tags',
      control,
   })

   const tagList = fields.map((field, index) => (
      <Flex
         key={field.id}
         $gap={'10px'}
         $align={'flex-end'}
         $margin={'0 0 1px 0'}
      >
         <Input
            {...register(`tags.${index}.value`, { maxLength: MAX_TAG_LENGTH })}
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
   ))

   return (
      <Flex $padding="150px 0 0 0" $w="100%" $align="center" $justify="center">
         <Form $gap="20px" $w="80%" onSubmit={handleSubmit(onSubmit)}>
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
               <>
                  {fields.length < MAX_TAGS && (
                     <Button
                        type="button"
                        onClick={() => append({ value: '' })}
                        $outlined
                     >
                        Add
                     </Button>
                  )}
               </>
            </Flex>

            <Button disabled={!isDirty} type="submit" $w="200px" $stretched>
               Send
            </Button>
         </Form>
      </Flex>
   )
}

export default ArticleForm
