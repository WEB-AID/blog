import { useNavigate } from "react-router-dom"
import Button from "../../shared/ui/Button"

export const EditPostButton = ({slug}: any) => {
    const navigate = useNavigate()
    const handleNavigate = () => navigate(`/articles/${slug}/edit`)

    return (
        <Button $outlined onClick={handleNavigate}>
            Edit
        </Button>
    )
}