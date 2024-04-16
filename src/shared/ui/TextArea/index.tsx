import React, { FC, forwardRef } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import styled, { css } from 'styled-components'

interface IStyledTextArea {
   $err?:
      | Merge<FieldError, FieldErrorsImpl<{ value: string }>>
      | undefined
      | FieldError
      | boolean
   $w?: string
}

interface ITextAreaProps extends IStyledTextArea {
   children: string | JSX.Element | JSX.Element[]
   placeholder?: string
   required?: boolean
   name?: string
   value?: string
}

const StyledLabel = styled.label`
   display: flex;
   position: relative;
   width: auto;
   flex-direction: column;
   gap: 3px;
`

const StyledTextArea = styled.textarea<any>`
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

   min-height: 200px;
   height: auto;
   resize: none;
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

export const TextArea: FC<ITextAreaProps> = forwardRef((props, ref) => {
   let { children, ...rest } = props
   return (
      <StyledLabel {...rest}>
         <div style={{ display: 'flex', gap: '10px' }}>{children}</div>
         <StyledTextArea ref={ref} {...rest} />
      </StyledLabel>
   )
})

TextArea.displayName = 'TextArea'
