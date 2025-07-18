import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
