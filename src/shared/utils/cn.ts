type ClassNameValue = string | number | boolean | undefined | null

export const cn = (...classNames: ClassNameValue[]) => {
  return classNames.filter(Boolean).join(' ')
}
