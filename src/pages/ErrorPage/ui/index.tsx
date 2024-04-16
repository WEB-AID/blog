import styled from 'styled-components'
import { Link } from 'react-router-dom'

const theme = {
   white: '#ededed',
   gray: '#bfc0c0',
   dark: '#585959',
   light: '#d3deea',
}
export const ErrPageDiv = styled.div`
   .container {
      position: relative;
      width: 100%;
      height: 100vh;
      background-color: red;
   }

   .ghost {
      width: 250px;
      height: 300px;
      left: 43%;
      top: 40%;
      position: absolute;
      border-radius: 50% 50% 0 0;
      background: ${theme.white};
      border: 1px solid ${theme.gray};
      border-bottom: none;
      animation: float 2s ease-out infinite;
   }

   .ghost-copy {
      width: 250px;
      height: 300px;
      left: 43%;
      top: 40%;
      position: absolute;
      border-radius: 50% 50% 0 0;
      background: ${theme.white};
      border: 1px solid ${theme.gray};
      border-bottom: none;
      animation: float 2s ease-out infinite;
      z-index: 0;
   }

   .face {
      position: absolute;
      width: 100%;
      height: 60%;
      top: 20%;
   }
   .eye,
   .eye-right {
      position: absolute;
      background: ${theme.dark};
      width: 13px;
      height: 13px;
      border-radius: 50%;
      top: 40%;
   }

   .eye {
      left: 25%;
   }
   .eye-right {
      right: 25%;
   }

   .mouth {
      position: absolute;
      top: 50%;
      left: 45%;
      width: 10px;
      height: 10px;
      border: 3px solid;
      border-radius: 50%;
      border-color: transparent ${theme.dark} ${theme.dark} transparent;
      transform: rotate(45deg);
   }

   .one,
   .two,
   .three,
   .four {
      position: absolute;
      background: ${theme.white};
      top: 85%;
      width: 26%;
      height: 23%;
      border: 1px solid ${theme.gray};
      z-index: 0;
   }

   .one {
      border-radius: 0 0 100% 30%;
      left: -1px;
   }

   .two {
      left: 23%;
      border-radius: 0 0 50% 50%;
   }

   .three {
      left: 50%;
      border-radius: 0 0 50% 50%;
   }

   .four {
      left: 74.5%;
      border-radius: 0 0 30% 100%;
   }

   @keyframes float {
      50% {
         transform: translateY(15px);
      }
   }

   .bottom {
      margin-top: 10px;
   }
`

export const StyledLink = styled(Link)`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   gap: 20px;
   &:hover {
   }
`
