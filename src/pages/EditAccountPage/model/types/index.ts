import { FetchStatus } from '../../../../shared/api'

export type EditAccountFormType = {
   username?: string
   email?: string
   password?: string
   image?: string
}

export type EditProfileSliceType = {
   username: string | null
   email: string | null
   image: string | null
   status: FetchStatus | null
}
