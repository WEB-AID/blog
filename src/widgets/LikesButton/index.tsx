import React, { FC, useState } from 'react'
import { addLike, removeLike } from './model/slice'
import { LikesButtonProps } from './model/types'
import { useAppDispatch } from '../../shared/hooks'
import Like from '../../shared/ui/Like'

const LikesButton: FC<LikesButtonProps> = ({
   isLogged,
   slug,
   favorited,
   favoritesCount,
}) => {
   const [likes, setLikes] = useState<number>(favoritesCount)
   const [checked, setChecked] = useState<boolean>(favorited)
   const dispatch = useAppDispatch()

   const onLikeChanged = () => {
      setChecked(!checked)
      dispatch(checked ? removeLike(slug) : addLike(slug))
      setLikes((prev) => (checked ? prev - 1 : prev + 1))
   }

   return (
      <>
         <Like
            checked={checked}
            disabled={!isLogged}
            onChange={onLikeChanged}
         />
         <span>{likes}</span>
      </>
   )
}

export default LikesButton
