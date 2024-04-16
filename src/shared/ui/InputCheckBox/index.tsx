import React, { FC } from 'react'
import styled from 'styled-components'

const InputCheckBoxLabel = styled.label`
   display: flex;
   align-items: flex-start;
   padding-left: 35px;
`

const StyledSpanCheck = styled.span`
   position: absolute;
   margin-left: -35px;
   width: 20px;
   height: 20px;
   border-radius: 4px;
   background-color: white;
   border: 1px solid #1890ff;
`

const InputCheckBoxInput = styled.input.attrs({ type: 'checkbox' })`
   appearance: none;
   position: absolute;
   &:checked + ${StyledSpanCheck} {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #1890ff;
      &::before {
         content: '✓';
         font-size: 0.9rem;
         color: white;
      }
   }
`

type InputCheckBoxProps = {
   children: JSX.Element | JSX.Element[] | string
   checked?: boolean
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputCheckBox: FC<InputCheckBoxProps> = ({ children, ...rest }) => {
   return (
      <InputCheckBoxLabel>
         <InputCheckBoxInput {...rest} />
         <StyledSpanCheck />
         {children}
      </InputCheckBoxLabel>
   )
}

export default InputCheckBox
