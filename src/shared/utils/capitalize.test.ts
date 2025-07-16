import { capitalize } from './capitalize'

describe('capitalize', () => {
  it('should capitalize the first letter of each word', () => {
    expect(capitalize('hello world')).toBe('Hello World')
  })

  it('should return the same string if it is already capitalized', () => {
    expect(capitalize('Hello World')).toBe('Hello World')
  })

  it('should capitalize the first letter of each word even if there are capitalized and not capitalized words', () => {
    expect(capitalize('hello World')).toBe('Hello World')
  })
})
