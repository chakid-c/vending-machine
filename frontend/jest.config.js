module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', 
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { isolatedModules: true }],
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};
