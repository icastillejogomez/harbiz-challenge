import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
  },
  setupFilesAfterEnv: ['jest-extended/all'],
  testEnvironment: 'node',
  verbose: true
}

export default jestConfig
