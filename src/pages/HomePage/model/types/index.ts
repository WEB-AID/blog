import { FetchStatus } from '../../../../shared/api'

type PostPageState = {
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

export type postListState = {
   posts: PostPageState[]
   status: FetchStatus | null
   error: boolean | null
   postsCount: null | number
   currentPage: number
}
