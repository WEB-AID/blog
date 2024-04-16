import React from 'react'
import styled from 'styled-components'

const StyledLoader = styled.span`
   width: 20px;
   height: 20px;
   border-width: 3px;
   border-style: dashed solid solid dotted;
   border-color: #7ec5ff #7ec5ff transparent #7ec5ff;
   border-radius: 50%;
   display: inline-block;
   position: relative;
   box-sizing: border-box;
   animation: rotation 1s linear infinite;
   &::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 4px;
      top: 11px;
      border: 6px solid transparent;
      border-right-color: #7ec5ff;
      transform: rotate(-54deg);
      @keyframes rotation {
         0% {
            transform: rotate(0deg);
         }
         100% {
            transform: rotate(360deg);
         }
      }
   }
`

export const ButtonLoader = () => {
   return <StyledLoader />
}
