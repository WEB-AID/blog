import React, { FC, MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'

type IStyledButtonProps = Partial<{
   $background: string
   $w: string
   $margin: string
   $outlined: boolean
   $color: string
   $stretched: boolean
   $outlineColor: string
}>

export interface IButtonProps extends IStyledButtonProps {
   children?: JSX.Element | JSX.Element[] | string
   type?: 'button' | 'submit' | 'reset'
   disabled?: boolean
   onClick?: MouseEventHandler<HTMLButtonElement>
}

const StyledButton = styled.button<IStyledButtonProps>`
   display: flex;
   justify-content: center;
   align-items: center;
   border: none;
   padding: 8px 16px 8px 16px;
   font-size: 18px;
   cursor: pointer;
   background: ${({ $background }) => $background || 'transparent'};
   color: ${({ $color }) => $color || 'black'};
   border-radius: 4px;
   width: ${({ $w }) => $w || 'auto'};
   height: auto;
   margin: ${({ $margin }) => $margin || '0'};
   transition: 200ms;

   &:hover {
      text-decoration: underline;
   }

   &:focus {
      outline: none;
   }

   &:disabled {
      background-color: #8c8c8c;
      outline: #8c8c8c;
      opacity: 0.3;
      color: #fff;
   }

   ${(props) =>
      props.$outlined &&
      css<IStyledButtonProps>`
         outline: 1px solid ${({ $color }) => $color || 'lightgreen'};
         background: transparent;
         color: ${({ $color }) => $color || 'lightgreen'};
         &:hover {
            text-decoration: none;
            background: ${({ $color }) => $color || 'lightgreen'};
            color: white;
         }
         &:focus {
            outline: 1px solid ${({ $color }) => $color || 'lightgreen'};
            background: transparent;
            color: ${({ $color }) => $color || 'lightgreen'};
         }
      `}

   ${(props) =>
      props.$stretched &&
      css<IStyledButtonProps>`
         text-decoration: none;
         outline: 1px solid ${({ $color }) => $color || '#1890FF'};
         background: ${({ $color }) => $color || '#1890FF'};
         color: #fff;
         &:hover {
            outline: 1px solid ${({ $color }) => $color || '#1890FF'};
            color: ${({ $color }) => $color || '#1890FF'};
            text-decoration: none;
            background: #fff;
         }
         &:focus-visible {
            outline: 1px solid ${({ $color }) => $color || '#1890FF'};
            color: ${({ $color }) => $color || '#1890FF'};
            text-decoration: none;
            background: #fff;
         }

         &:disabled {
            background-color: #8c8c8c;
            outline: #8c8c8c;
            opacity: 0.3;
            color: #fff;
            cursor: not-allowed;
         }
      `}
`

const Button: FC<IButtonProps> = ({ type = 'button', children, ...rest }) => {
   return (
      <StyledButton type={type} {...rest}>
         {children}
      </StyledButton>
   )
}

export default Button
