import { FetchStatus } from '../../../../shared/api'

type TypeErrors = {
   username?: string
   email?: string
}

export type CreateAccountSliceState = {
   isSuccessed: null | boolean
   errorStatus: null | number
   status: null | FetchStatus | string
   errors: TypeErrors
}

export type TypeFormData = {
   username: string
   email: string
   password: string
   confirmPassword: string
}
