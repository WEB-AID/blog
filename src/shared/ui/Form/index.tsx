import React, { forwardRef } from 'react'
import styled from 'styled-components'

type ThemeKeys = '$background' | '$w' | '$margin' | '$gap'

type IForm = Partial<Record<ThemeKeys, string>>

interface FormProps extends IForm {
   children: JSX.Element[] | JSX.Element | any
   onSubmit?: any
   className?: string
}

export const StyledForm = styled.form<any>`
   display: flex;
   border-radius: 8px;
   box-shadow: 0 0 25px rgba(0, 0, 0, 0.06);
   background: ${({ $background }) => $background || 'white'};
   flex-direction: column;
   width: ${({ $w }) => $w || '384px'};
   height: auto;
   padding: 48px 32px 48px 32px;
   margin: ${({ $margin }) => $margin || 0};
   gap: ${({ $gap }) => $gap || 0};
`

export const Form = forwardRef((props: FormProps, ref) => {
   return <StyledForm {...props} ref={ref} />
})

Form.displayName = 'Form'
