import React from 'react'
import styled from 'styled-components'

const StyledLoader = styled.span`
   width: 200px;
   height: 200px;
   display: inline-block;
   position: relative;
   border: 3px solid;
   border-color: #67dcff #0000 #fff #0000;
   border-radius: 50%;
   box-sizing: border-box;
   animation: 1s rotate linear infinite;

   &:before,
   &:after {
      content: '';
      top: 0;
      left: 0;
      position: absolute;
      border: 10px solid transparent;
      border-bottom-color: #fff;
      transform: translate(15px, 150px) rotate(-35deg);
   }
   &:after {
      border-color: #67dcff #0000 #0000 #0000;
      transform: translate(160px, 25px) rotate(-35deg);
   }
   @keyframes rotate {
      100% {
         transform: rotate(360deg);
      }
   }
`

export const Loader = () => {
   return <StyledLoader />
}
