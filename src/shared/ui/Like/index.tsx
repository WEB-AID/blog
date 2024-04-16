import React, { FC } from 'react'
import styled from 'styled-components'
import emptyLike from '../../assets/like.png'
import fullfilledLike from '../../assets/like_fullfilled.png'

const InputCheckBoxLabel = styled.label`
   display: flex;
   align-items: flex-start;
`

const StyledSpanCheck = styled.span`
   @keyframes heartbeat {
      to {
         transform: scale(1.2);
      }
   }
   width: 18px;
   height: 18px;
   border-radius: 4px;
   cursor: pointer;
   background: url(${emptyLike}) no-repeat;
   background-size: contain;
   transition: 150ms;
`

const InputCheckBoxInput = styled.input.attrs({ type: 'checkbox' })`
   appearance: none;
   position: absolute;
   &:checked + ${StyledSpanCheck} {
      display: flex;
      justify-content: center;
      align-items: center;
      background: url(${fullfilledLike}) no-repeat;
      background-size: contain;
      animation: heartbeat 250ms 3 alternate forwards;
      &::before {
         content: '';
      }
   }
`

type InputCheckBoxProps = {
   children?: JSX.Element | JSX.Element[] | string
   checked?: boolean
   disabled?: boolean
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Like: FC<InputCheckBoxProps> = ({ children, ...rest }) => {
   return (
      <InputCheckBoxLabel>
         <InputCheckBoxInput {...rest} />
         <StyledSpanCheck />
         {children}
      </InputCheckBoxLabel>
   )
}

export default Like
