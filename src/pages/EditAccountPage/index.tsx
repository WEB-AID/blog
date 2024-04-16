import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getUser, updateUser } from './model/slice'
import { EditAccountFormType } from './model/types'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import {
   handleEmailValidation,
   validateImgurLink,
} from '../../shared/helpers/validation'
import { Form } from '../../shared/ui/Form'
import { Input } from '../../shared/ui/Input'
import { Span } from '../../shared/ui/Span'
import Button from '../../shared/ui/Button'
import Flex from '../../shared/ui/Flex'
import { ButtonLoader } from '../../shared/ui/ButtonLoader'

export const EditAccountPage: FC = () => {
   const dispatch = useAppDispatch()
   const { isLogged } = useAppSelector((state) => state.signInForm)
   const { status, username, email, image } = useSelector(
      (state: any) => state.editProfile
   )
   const nav = useNavigate()
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<EditAccountFormType>({
      defaultValues: {
         username: '',
         email: '',
         password: '',
         image: '',
      },
   })

   useEffect(() => {
      if (isLogged) {
         dispatch(getUser())
         setValue('username', username)
         setValue('email', email)
         setValue('image', image)
      } else {
         nav('/sign-in')
      }
   }, [dispatch, setValue, nav, isLogged, username, email, image])

   const onSubmit = (data: EditAccountFormType) => {
      if (username === data.username) delete data.username
      if (email === data.email) delete data.email
      if (data.password === '') delete data.password
      if (image === data.image) delete data.image
      if (Object.keys(data).length !== 0) dispatch(updateUser(data))
      setValue('password', '')
   }

   return (
      <Flex $padding="150px 0 0 0" $w="100%" $justify="center">
         <Form $gap="20px" onSubmit={handleSubmit(onSubmit)}>
            <Span $fz="20px" $margin="0 auto">
               Edit Profile
            </Span>
            <Input
               {...register('username', {
                  maxLength: 20,
                  minLength: 3,
                  min: 3,
               })}
            >
               Username
            </Input>
            <Input
               {...register('email', {
                  validate: (text) => handleEmailValidation(text!),
               })}
            >
               Email adress
            </Input>
            <Input
               type="password"
               {...register('password', { minLength: 6, maxLength: 40 })}
            >
               New password
            </Input>
            <Input
               placeholder="https://i.imgur.com/"
               {...register('image', { validate: validateImgurLink })}
            >
               Avatar URL
            </Input>
            {errors.image && (
               <>
                  <Span $fz="12px" $color="red">
                     Link must be an imgur image URL.
                  </Span>
                  <Span $fz="12px" $color="lightgray">
                     {' '}
                     Download your image on https://imgur.com, then right click
                     on it and `copy image URL` and paste it to the input
                  </Span>
               </>
            )}
            <Button $stretched type="submit">
               {status === 'loading' ? <ButtonLoader /> : `Save`}
            </Button>
         </Form>
      </Flex>
   )
}
