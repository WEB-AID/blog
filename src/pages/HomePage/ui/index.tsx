import styled from 'styled-components'

export const ScrollBtn = styled.div<{
   $down: boolean
   $text?: string
}>`
   position: fixed;
   display: flex;
   flex-direction: column;
   justify-content: flex-end;
   align-items: center;
   background-position: center;
   background-repeat: no-repeat;
   position: fixed;
   width: 50px;
   height: 50px;
   cursor: pointer;
   bottom: 50px;
   gap: 5px;
   right: 50px;
   font-weight: 600;
   color: #1890ff;
   transition: 300ms;

   &::before {
      content: '';
      top: 10px;
      left: 17px;
      transform: ${(props) =>
         !props.$down ? 'rotateZ(48deg)' : 'rotateZ(-48deg)'};
      transition: 300ms;
      position: absolute;
      width: 4px;
      height: 20px;
      background-color: #1890ff;
      border-radius: 2px 0 0 0;
   }
   &::after {
      top: 10px;
      transform: ${(props) =>
         !props.$down ? 'rotateZ(-48deg)' : 'rotateZ(48deg)'};
      right: 17px;
      transition: 300ms;
      position: absolute;
      content: '';
      width: 4px;
      height: 20px;
      background-color: #1890ff;
      border-radius: 0 2px 0 0;
   }
`
