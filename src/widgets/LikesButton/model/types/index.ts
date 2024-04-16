import { FetchStatus } from '../../../../shared/api'

export type LikeSliceState = {
   statusLike: FetchStatus | null
   statusDislike: FetchStatus | null
}

export interface LikesButtonProps {
   favorited: boolean
   isLogged: boolean
   favoritesCount: number
   slug: any
}
