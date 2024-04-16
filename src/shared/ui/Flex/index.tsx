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
   | '$ml'
   | '$borderRadius'
   | '$bgImageUrl'
   | '$boxShadow'
   | '$position'
   | '$zIndex'

type StyledDiv = Partial<Record<ThemeKeys, string>>

interface IDivProps extends StyledDiv {
   children?: JSX.Element[] | JSX.Element | string | null | undefined | Element
   className?: string
}

const StyledFlex = styled.div<StyledDiv>`
   display: flex;
   flex-direction: ${({ $dir }) => $dir || 'row'};
   justify-content: ${({ $justify }) => $justify || 'flex-start'};
   align-items: ${({ $align }) => $align || 'flex-start'};
   align-self: ${({ $self }) => $self};
   background-color: ${({ $bgcolor }) => $bgcolor || 'transparent'};
   width: ${({ $w }) => $w || 'auto'};
   height: ${({ $h }) => $h || 'auto'};
   margin: ${({ $margin }) => $margin || 0};
   padding: ${({ $padding }) => $padding || 0};
   gap: ${({ $gap }) => $gap || '0'};
   margin-left: ${({ $ml }) => $ml || '0'};
   box-shadow: ${({ $boxShadow }) => $boxShadow || 'none'};
   border-radius: ${({ $borderRadius }) => $borderRadius || 'none'};
   background-image: url(${({ $bgImageUrl }) => $bgImageUrl || 'none'});
   background-repeat: no-repeat;
   background-position: 50% 50%;
   background-size: cover;
   word-break: break-all;
   position: ${({ $position }) => $position || ''};
   z-index: ${({ $zIndex }) => $zIndex};
`

const Flex: FC<IDivProps> = (props: any) => {
   return <StyledFlex {...props} />
}

export default Flex
