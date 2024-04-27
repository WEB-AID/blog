export type ArticleFormType = {
   tags?: { value: string }[]
   title: string
   description: string
   text: string
}

export interface EditPostProps {
   slug?: string
   title?: string
   description?: string
   body?: string
   tags?: string[]
}

export interface ArticleFormProps {
   onSubmit: (data: ArticleFormType) => void
   defaultValues: ArticleFormType
}