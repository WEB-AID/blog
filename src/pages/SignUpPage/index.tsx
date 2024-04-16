import React, { useState, useEffect, FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createUser, setSucceedFalse } from './model/slice'
import { TypeFormData } from './model/types'
import { SuccessLogin } from '../../widgets/SuccessLogin'
import {
   handleEmailValidation,
   handlePasswordValidation,
} from '../../shared/helpers/validation'
import { throwFieldError } from '../../shared/helpers/errors'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import Flex from '../../shared/ui/Flex'
import { Input } from '../../shared/ui/Input'
import Divider from '../../shared/ui/Divider'
import InputCheckBox from '../../shared/ui/InputCheckBox'
import Button from '../../shared/ui/Button'
import { Span } from '../../shared/ui/Span'
import { Form } from '../../shared/ui/Form'
import { ButtonLoader } from '../../shared/ui/ButtonLoader'

const SignUpPage: FC = () => {
   const dispatch = useAppDispatch()
   const [checked, setChecked] = useState(true)
   const {
      status,
      errors: { username, email },
      isSuccessed,
   } = useAppSelector((state) => state.signUpForm)

   const {
      handleSubmit,
      register,
      watch,
      formState: { errors },
      setError,
   } = useForm<TypeFormData>({
      defaultValues: {
         username: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
   })

   useEffect(() => {
      if (status === 'rejected') {
         setError('username', { type: 'usernameTaken', message: username })
         setError('email', { type: 'emailTaken', message: email })
      }
   }, [email, setError, status, username])

   useEffect(() => {
      dispatch(setSucceedFalse())
   }, [dispatch])

   const onSubmit: SubmitHandler<TypeFormData> = (data) => {
      dispatch(createUser(data))
   }

   const password = watch('password', '')

   const handleCheck = () => setChecked(!checked)

   return (
      <Flex $padding="150px 0 0 0" $justify="center" $align="center">
         <Form $margin="0 auto" $gap="10px" onSubmit={handleSubmit(onSubmit)}>
            {isSuccessed ? (
               <SuccessLogin />
            ) : (
               <>
                  <h2>
                     <Span
                        $fz="20px"
                        $fw="600"
                        $w="100%"
                        $justify="center"
                        $margin="0 0 21px 0"
                     >
                        Create new account
                     </Span>
                  </h2>
                  <Input
                     {...register('username', {
                        required: true,
                        maxLength: 20,
                        minLength: 3,
                     })}
                     placeholder="Username"
                     name="username"
                     $err={errors.username}
                  >
                     Username
                  </Input>
                  {throwFieldError(errors, 'username', 40)}
                  <Input
                     {...register('email', {
                        required: true,
                        minLength: 6,
                        maxLength: 60,
                        validate: handleEmailValidation,
                     })}
                     placeholder="Email address"
                     name="email"
                     $err={errors.email}
                  >
                     Email
                  </Input>
                  {throwFieldError(errors, 'email', 60)}

                  <Input
                     {...register('password', {
                        required: true,
                        validate: handlePasswordValidation,
                     })}
                     placeholder="Password"
                     type="password"
                     name="password"
                     $err={errors.password}
                  >
                     Password
                  </Input>
                  {errors.password && (
                     <span
                        style={{
                           color: 'red',
                           fontSize: '12px',
                           wordBreak: 'break-word',
                        }}
                     >
                        Password must be more than 8 characters long and contain
                        a capital letter.
                     </span>
                  )}
                  <Input
                     {...register('confirmPassword', {
                        required: true,
                        validate: (value) => value === password,
                     })}
                     placeholder="Password"
                     type="password"
                     name="confirmPassword"
                     $err={errors.confirmPassword}
                  >
                     Repeat Password
                  </Input>
                  {errors.confirmPassword && (
                     <span
                        style={{
                           color: 'red',
                           fontSize: '12px',
                           wordBreak: 'break-word',
                        }}
                     >
                        Password does not match
                     </span>
                  )}
                  <Divider />
                  <InputCheckBox checked={checked} onChange={handleCheck}>
                     <span style={{ wordBreak: 'break-word' }}>
                        I agree to the processing of my personal information
                     </span>
                  </InputCheckBox>
                  <Button type="submit" $stretched disabled={!checked}>
                     {status === 'loading' ? <ButtonLoader /> : 'Create'}
                  </Button>
                  <Span
                     $justify="center"
                     $fz="13px"
                     $gap="5px"
                     $color="#8c8c8c"
                  >
                     <span>Already have an account?</span>
                     <a href="#" style={{ color: '#1890FF' }}>
                        Sign in
                     </a>
                  </Span>
               </>
            )}
         </Form>
      </Flex>
   )
}

export default SignUpPage
