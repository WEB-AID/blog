import { NavLink } from 'react-router-dom'
import { Span } from '../../../shared/ui/Span'
import styled from 'styled-components'
import logoImgWrapper from '../../../shared/assets/logo-earth-blue-wrapper.svg'

export const ProfileAvatar = styled.img`
   width: 46px;
   height: 46px;
   border-radius: 50%;
   cursor: pointer;
   box-shadow: 0 0 3px rgb(63, 255, 255);
   transition: box-shadow 300ms;
   &:hover {
      box-shadow: 0 0 10px rgb(11, 240, 87);
   }
   &.active {
      box-shadow: 0 0 10px rgb(11, 240, 87);
   }
`
export const LogoSpan = styled(Span)`
   color: #2c2c2c;
   font-size: 20px;
   font-weight: 600;
   text-transform: uppercase;
   transition: 300ms;
`
export const Logo = styled(NavLink)`
   @keyframes planetSpin {
      from {
         transform: rotateY(0);
      }
      to {
         transform: rotateZ(360deg);
      }
   }

   @keyframes planetScale {
      from {
         transform: scale(0);
      }

      to {
         transform: scale(1);
      }
   }

   display: flex;
   height: 80px;
   justify-content: center;
   align-items: center;
   gap: 10px;
   div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background-image: url(${logoImgWrapper});
      background-size: contain;
      transform: scale(0);
      transition: 300ms;
   }
   img {
      position: relative;
      width: 30px;
      height: 30px;
      transform: scale(0);
      transition: 300ms;
   }
   &:hover,
   &.active {
      div {
         transform: scale(1);
      }
      span {
         color: #1890ff;
      }
      img {
         animation:
            planetScale 300ms 1 ease-in-out forwards,
            planetSpin 2.5s 300ms infinite linear;
         transition: 300ms;
      }
   }
`
