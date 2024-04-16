import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginUser, setDefaultSucceed } from './model/slice'
import { ILoginForm } from './model/types'
import { handleEmailValidation } from '../../shared/helpers/validation'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { Form } from '../../shared/ui/Form'
import Flex from '../../shared/ui/Flex'
import { Input } from '../../shared/ui/Input'
import Button from '../../shared/ui/Button'
import { Span } from '../../shared/ui/Span'
import { ButtonLoader } from '../../shared/ui/ButtonLoader'

const SignInPage: FC = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const { isLogged, isSucceed, status } = useAppSelector(
      (state) => state.signInForm
   )

   const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
   } = useForm<ILoginForm>({
      defaultValues: {
         email: '',
         password: '',
      },
   })

   const onSubmit: SubmitHandler<ILoginForm> = (data) => {
      dispatch(loginUser(data))
   }

   useEffect(() => {
      if (!isSucceed) {
         setError('email', {})
         setError('password', {})
      } else if (isLogged) {
         navigate('/')
      }

      return () => {
         dispatch(setDefaultSucceed())
      }
   }, [isSucceed, isLogged, setError, navigate, dispatch])

   return (
      <Flex $w="100%" $padding="150px 0 0 0" $justify="center" $align="center">
         <Form $margin="0 auto" $gap="12px" onSubmit={handleSubmit(onSubmit)}>
            <h2>
               <Span
                  $fz="20px"
                  $fw="600"
                  $w="100%"
                  $justify="center"
                  $margin="0 0 21px 0"
               >
                  Sign In
               </Span>
            </h2>
            <Input
               $err={errors.email}
               {...register('email', {
                  required: true,
                  validate: handleEmailValidation,
               })}
               placeholder="Email address"
               type="text"
            >
               Email address
            </Input>
            <Input
               $err={errors.password}
               {...register('password', { required: true })}
               placeholder="Password"
               type="password"
            >
               Password
            </Input>
            <Span>
               {errors.email || errors.password ? (
                  <span
                     style={{
                        color: 'red',
                        fontSize: '12px',
                        wordBreak: 'break-word',
                     }}
                  >
                     Email or Password is not valid.
                  </span>
               ) : null}
            </Span>
            <Button $margin="9px 0 0 0" type="submit" $stretched>
               {status === 'loading' ? <ButtonLoader /> : `Login`}
            </Button>
            <Span
               $w="100%"
               $justify="center"
               $fz="13px"
               $fw="400"
               $gap="5px"
               $color="#8C8C8C"
            >
               <span>Already have an account?</span>
               <a href="#" style={{ color: '#1890FF' }}>
                  Sign in
               </a>
            </Span>
         </Form>
      </Flex>
   )
}

export default SignInPage
