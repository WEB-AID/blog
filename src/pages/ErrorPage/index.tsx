import React from 'react'
import { ErrPageDiv, StyledLink } from './ui'
import Flex from '../../shared/ui/Flex'
import { Span } from '../../shared/ui/Span'
import Button from '../../shared/ui/Button'

const ErrorPage = () => {
   return (
      <>
         <Flex
            $padding="200px 0 0 0"
            $w="100%"
            $h="100vh"
            $dir="column"
            $align="center"
            $gap="20px"
         >
            <Span $fz="50px" $color="#c2c2c2" $fw="600">
               ERROR 404
            </Span>
            <Span $fw="600" $fz="40px" $color="#e6849c">
               THIS PAGE DOES NOT EXIST
            </Span>

            <Flex $margin="0 245px 0 0" $position="relative">
               <ErrPageDiv className="container">
                  <ErrPageDiv className="ghost-copy">
                     <ErrPageDiv className="one"></ErrPageDiv>
                     <ErrPageDiv className="two"></ErrPageDiv>
                     <ErrPageDiv className="three"></ErrPageDiv>
                     <ErrPageDiv className="four"></ErrPageDiv>
                  </ErrPageDiv>
                  <ErrPageDiv className="ghost">
                     <ErrPageDiv className="face">
                        <ErrPageDiv className="eye"></ErrPageDiv>
                        <ErrPageDiv className="eye-right"></ErrPageDiv>
                        <ErrPageDiv className="mouth"></ErrPageDiv>
                     </ErrPageDiv>
                  </ErrPageDiv>
               </ErrPageDiv>
            </Flex>
            <Span $padding="380px 0 0 0" $fz="20px" $gap="5px">
               <StyledLink to="/">
                  <Span $color="#c2c2c2" $fz="20px">
                     HURRY, ESCAPE THE GHOST!
                  </Span>
                  <Button $margin="0 0 0 15px" $stretched $color="#e6849c">
                     Homepage
                  </Button>
               </StyledLink>
            </Span>
         </Flex>
      </>
   )
}

export default ErrorPage
