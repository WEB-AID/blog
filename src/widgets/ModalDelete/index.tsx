import React, { FC } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../shared/hooks'
import { deletePost } from '../../pages/PostPage/model/slice'
import Button from '../../shared/ui/Button'
import Flex from '../../shared/ui/Flex'
import { Form } from '../../shared/ui/Form'
import { Span } from '../../shared/ui/Span'
import styled from 'styled-components'

interface IModalDeleteProps {
   isShown: boolean
   slug: string
   onClose: () => void
}

const StyledWrapper = styled(Flex)`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgb(0, 0, 0, 0.4);
`

const StyledForm = styled(Form)`
   transform: translateY(-120%) translateX(120%) scale(0.2);
   opacity: 0;
   display: flex;
   flex-direction: column;
   gap: 20px;
   animation: modal 400ms forwards;
   @keyframes modal {
      to {
         opacity: 1;
         transform: translateY(0) translateX(0) scale(1);
      }
   }
`

export const ModalDelete: FC<IModalDeleteProps> = ({
   isShown,
   slug,
   onClose,
}) => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   if (!isShown) {
      return null
   }

   const handleClick = async () => {
      await dispatch(deletePost(slug))
      navigate('/')
   }

   return createPortal(
      <>
         <StyledWrapper>
            <Flex $w={'100%'} $h={'100%'} $align="center" $justify="center">
               <StyledForm $gap="20px">
                  <Span $justify="center" $w="100%" $fz="16px">
                     Are you sure you want to delete this article?
                  </Span>
                  <Flex $w="100%" $justify="center" $gap="20px">
                     <Button
                        $w="100px"
                        onClick={handleClick}
                        $stretched
                        $color="lightgreen"
                     >
                        Yes
                     </Button>
                     <Button
                        $w="100px"
                        onClick={onClose}
                        $stretched
                        $color="tomato"
                     >
                        No
                     </Button>
                  </Flex>
               </StyledForm>
            </Flex>
         </StyledWrapper>
      </>,
      document.getElementById('modal-delete')!
   )
}
