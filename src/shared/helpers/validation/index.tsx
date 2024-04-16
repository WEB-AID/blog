import React from 'react'

const isValidEmail = (email: string): boolean =>
   // eslint-disable-next-line no-useless-escape
   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
   )

export const validateImgurLink = (url = ''): boolean => {
   let regex = /^$|https:\/\/i.imgur\.com/
   return regex.test(url)
}

const isPasswordValid = (password: string): boolean => {
   return /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/.test(password)
}

export const handleEmailValidation = (email: string): boolean => {
   const isValid = isValidEmail(email)
   return isValid
}

export const handlePasswordValidation = (password: string): boolean => {
   return isPasswordValid(password)
}
