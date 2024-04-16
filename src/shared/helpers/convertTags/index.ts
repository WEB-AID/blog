import { ArticleFormType } from '../../../widgets/CreateAndEditForm/model/types'

export const convertTags = (data: ArticleFormType) => {
   return data.tags ? data.tags!.map((el) => el.value) : []
}
