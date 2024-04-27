import { useNavigate } from 'react-router-dom'
import Button from '../../shared/ui/Button'

export const CreatePostButton = () => {
   const navigate = useNavigate()

   return (
      <Button
         onClick={() => navigate('/new-article')}
         $stretched
         $color="lightgreen"
      >
         Create Article
      </Button>
   )
}
