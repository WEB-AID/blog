import { FetchStatus } from '../../../../shared/api'

export type PostPageState = {
   slug: string
   title: string
   description: string
   body: string
   tagList: string[]
   createdAt: string
   updatedAt: string
   favoritesCount: number
   username: string
   image: string
   status: FetchStatus | null
   error: boolean | null
   favorited: boolean | null
}
