import { cn } from './cn'

describe('cn', () => {
  it('should return a string with all the class names joined by a space', () => {
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3')
  })

  it('should not add boolean or nullish values to the string', () => {
    expect(cn('class1', false, null, undefined, 'class2')).toBe('class1 class2')
  })
})
