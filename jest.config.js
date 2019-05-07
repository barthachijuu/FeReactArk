// jest.config.js
module.exports = {
  verbose: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/utility/*.{js,jsx}',
    '!/**/*.test.{js,jsx}',
    '!**/node_modules/**',
    '!**/*.{css,scss}',
  ],
  moduleNameMapper: {
    '^Api(.*)$': '<rootDir>web/src/api$1',
    '^Components(.*)$': '<rootDir>web/src/components$1',
    '^Store(.*)$': '<rootDir>web/src/store$1',
    '^Utility(.*)$': '<rootDir>web/src/utility$1',
    '.*\\.(css|scss)$': '<rootDir>/SCSSStub.js',
  },
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: [
    './internals/enzyme.setup.js',
  ],
  coverageDirectory: 'coverage/',
  collectCoverage: true,
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};
