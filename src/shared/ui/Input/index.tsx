import React, { FC, HTMLInputTypeAttribute, forwardRef, useState } from 'react'
import styled, { css } from 'styled-components'
import showPw from '../../assets/showPw.svg'
import hidePw from '../../assets/hidePw.svg'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
interface IStyledInput {
   $err?:
      | Merge<FieldError, FieldErrorsImpl<{ value: string }>>
      | undefined
      | FieldError
      | boolean
   $w?: string
}

interface InputProps extends IStyledInput {
   children: string | JSX.Element | JSX.Element[]
   type?: HTMLInputTypeAttribute
   placeholder?: string
   required?: boolean
   name?: string
   value?: string
   // eslint-disable-next-line no-unused-vars
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const StyledLabel = styled.label`
   display: flex;
   position: relative;
   width: auto;
   flex-direction: column;
   gap: 3px;
`

const StyledShowPassword = styled.span`
   z-index: 2;
   width: 30px;
   height: 30px;
   cursor: pointer;
   background: url(${hidePw});
   background-size: 20px 20px;
   background-repeat: no-repeat;
   background-position: 50% 50%;
   position: absolute;
   right: 10px;
   top: 25px;
   &.active {
      background: url(${showPw});
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: 50% 50%;
   }
`

export const StyledInput = styled.input<any>`
   @keyframes focusEffect {
      0% {
         outline: 1px solid rgb(24, 144, 255, 0);
      }
      100% {
         outline: 1px solid rgb(24, 144, 255, 1);
      }
   }

   @keyframes errorEffect {
      0% {
         outline: 1px solid rgb(197, 0, 49, 0);
      }
      100% {
         outline: 1px solid rgb(197, 0, 49, 1);
      }
   }

   height: 40px;
   border-radius: 5px;
   border: 1px solid rgba(217, 217, 217, 1);
   font-size: 16px;
   padding: 8px;
   width: ${({ $w }) => $w || 'auto'};

   &:focus {
      animation: focusEffect 300ms linear forwards;
   }

   ${({ $err }) =>
      $err &&
      css`
         outline: 1px solid rgb(197, 0, 45, 1);
         border: 1px solid rgb(197, 0, 45, 1);
         background-color: rgb(197, 0, 45, 0.03);
         &:focus {
            animation: errorEffect 300ms linear forwards;
         }
      `}
`
export const Input: FC<InputProps> = forwardRef((props, ref) => {
   let { type = 'text', children, ...rest } = props
   const [inputType, setInputType] = useState(type)

   const handleClick = () => {
      inputType === 'text' ? setInputType('password') : setInputType('text')
   }
   const classPw = inputType === 'text' ? 'active' : ''

   return (
      <StyledLabel>
         <div style={{ display: 'flex', gap: '10px' }}>{children}</div>
         <StyledInput type={inputType} ref={ref} {...rest} />
         {type === 'password' ? (
            <StyledShowPassword className={classPw} onClick={handleClick} />
         ) : null}
      </StyledLabel>
   )
})

Input.displayName = 'Input'
