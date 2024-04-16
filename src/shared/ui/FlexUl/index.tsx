import React, { FC } from 'react'
import styled from 'styled-components'

type ThemeKeys =
   | '$dir'
   | '$justify'
   | '$align'
   | '$self'
   | '$bgcolor'
   | '$w'
   | '$h'
   | '$margin'
   | '$padding'
   | '$gap'

type StyledUl = Partial<Record<ThemeKeys, string>>

interface IFlexUlProps extends StyledUl {
   children: JSX.Element | JSX.Element[]
}

const StyledFlexUl = styled.ul<StyledUl>`
   display: flex;
   flex-direction: ${({ $dir }) => $dir || 'column'};
   justify-content: ${({ $justify }) => $justify || 'flex-start'};
   align-items: ${({ $align }) => $align || 'flex-start'};
   align-self: ${({ $self }) => $self || 'flex-start'};
   background-color: ${({ $bgcolor }) => $bgcolor || 'transparent'};
   width: ${({ $w }) => $w || 'auto'};
   height: ${({ $h }) => $h || 'auto'};
   margin: ${({ $margin }) => $margin || '0'};
   padding: ${({ $padding }) => $padding || '0'};
   gap: ${({ $gap }) => $gap || '0'};
   min-height: 300px;
`

const FlexUl: FC<IFlexUlProps> = (props) => {
   return <StyledFlexUl {...props} />
}

export default FlexUl
