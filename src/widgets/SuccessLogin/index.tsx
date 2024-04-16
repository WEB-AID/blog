import React from 'react'
import { Link } from 'react-router-dom'
import Flex from '../../shared/ui/Flex'
import reg from '../../shared/assets/ok_reg.svg'
import { Span } from '../../shared/ui/Span'

export const SuccessLogin = () => {
   return (
      <Flex $w="100%" $align="center" $dir="column">
         <Span $color="green" $fw="600" $fz="25px">
            Registation succeed
         </Span>
         <img src={reg} alt="" />
         <Span $fz="16px" $gap="5px">
            <Link to={'/sign-in'}>Login</Link>
            to continue
         </Span>
      </Flex>
   )
}
