export type sliceTextOptions = {
   targetLength: number
   addDots?: boolean
}

export const sliceText = (
   str = '',
   { targetLength = 1, addDots = false }: sliceTextOptions
): string => {
   let newStr = str

   if (str && str.length >= targetLength) {
      if (addDots) {
         newStr = str.slice(0, targetLength - 3).trim() + '...'
      } else {
         newStr = str.slice(0, targetLength).trim()
      }
   }
   return newStr
}
