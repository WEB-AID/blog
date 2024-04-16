import React, { FC } from 'react'
import styled from 'styled-components'

const StyledDiviver = styled.div`
   display: block;
   margin: 10px 0 10px 0;
   width: 100%;
   height: 2px;
   background-color: rgba(0, 0, 0, 0.05) !important;
   background: transparent;
`

type DividerProps = {
   children?: null
}

const Divider: FC<DividerProps> = (props) => {
   return <StyledDiviver {...props} />
}

export default Divider
