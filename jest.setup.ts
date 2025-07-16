import React, { type ComponentProps } from 'react'

import '@testing-library/jest-dom'

// Add fetch polyfill for tests
global.fetch = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ComponentProps<'img'>) => {
    return React.createElement('img', props)
  },
}))

jest.mock('*.module.css', () => ({}))
jest.mock('*.module.scss', () => ({}))
jest.mock('*.module.sass', () => ({}))

beforeEach(() => {
  jest.clearAllMocks()
})
