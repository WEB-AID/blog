import React, { FC } from 'react'
import styled from 'styled-components'

type ThemeKeys =
   | '$textTransform'
   | '$fz'
   | '$fw'
   | '$w'
   | '$justify'
   | '$gap'
   | '$color'
   | '$margin'
   | '$padding'

type TypeSpan = Partial<Record<ThemeKeys, string>>

interface SpanProps extends TypeSpan {
   children: string | JSX.Element | JSX.Element[] | any
}

const StyledSpan = styled.span<TypeSpan>`
   display: flex;
   word-break: break-word;
   width: 100%;
   height: auto;
   color: ${({ $color }) => $color || '#000'};
   gap: ${({ $gap }) => $gap || '0'};
   justify-content: ${({ $justify }) => $justify || 'flex-start'};
   width: ${({ $w }) => $w || 'auto'};
   font-size: ${({ $fz }) => $fz || '1rem'};
   font-weight: ${({ $fw }) => $fw || '400'};
   padding: ${({ $padding }) => $padding || '0'};
   margin: ${({ $margin }) => $margin || '0'};
   text-transform: ${({ $textTransform }) => $textTransform || 'none'};
`

export const Span: FC<SpanProps> = (props) => {
   return <StyledSpan {...props} />
}
