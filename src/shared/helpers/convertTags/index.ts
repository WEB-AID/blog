import { ArticleFormType } from '../../../entities/CreateAndEditForm/model/types'

export const convertTags = (data: ArticleFormType) => {
   return data.tags ? data.tags!.map((el) => el.value) : []
}

export function convertTagsForm(tags: string[]): { value: string }[] {
   return tags.map((tag) => ({ value: tag }))
}