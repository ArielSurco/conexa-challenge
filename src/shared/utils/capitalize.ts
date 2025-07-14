export const capitalize = (str: string) => {
  const splittedString = str.split(' ')

  const capitalizedWords = splittedString.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase()
    const restOfTheString = word.slice(1).toLowerCase()

    return firstLetter + restOfTheString
  })

  return capitalizedWords.join(' ')
}
