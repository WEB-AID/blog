import React from 'react'

export const throwFieldError = (
   objErrors: any,
   field: string,
   maxLength: number
) => {
   const firstLetter = field.slice(0, 1).toUpperCase()
   const rest = field.slice(1)
   const capitalisedField = firstLetter + rest

   if (objErrors[field]?.message) {
      return (
         <span
            style={{
               color: 'red',
               fontSize: '12px',
               wordBreak: 'break-word',
            }}
         >
            {capitalisedField} {objErrors[field].message}
         </span>
      )
   }

   if (objErrors[field]) {
      return (
         <span
            style={{
               color: 'red',
               fontSize: '12px',
               wordBreak: 'break-word',
            }}
         >
            {capitalisedField} can`t be empty or longer than{' '}
            {maxLength.toString()} characters!
         </span>
      )
   }

   return null
}
