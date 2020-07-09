// jest.config.js
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!**/app/**/*.test.{js,jsx}',
    '!app/styles/**/*.{js,scss}',
    '!app/svg/**/*.svg',
    '!app/translations/**/*.json',
    '!app/utils/styleguide/**/*.{js,jsx}',
    '!app/index.jsx',
    '!app/**/*.{txt,ejs,htaccess}',
  ],
  coverageDirectory: 'coverage/',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 91,
      functions: 98,
      lines: 98,
      statements: 98,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  displayName: 'CLIENT',
  moduleNameMapper: {
    '^Api(.*)$': '<rootDir>app/api$1',
    '^Components(.*)$': '<rootDir>app/components$1',
    '^Mocks(.*)$': '<rootDir>app/mocks$1',
    '^Route(.*)$': '<rootDir>app/routes$1',
    '^Store(.*)$': '<rootDir>app/store$1',
    '^Utility(.*)$': '<rootDir>app/utils$1',
    '.*\\.(css|scss)$': '<rootDir>/__mocks__/SCSSStub.js',
    '\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/config/assetsTransformer.js',
  },
  setupFilesAfterEnv: [
    './internals/enzyme.setup.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    '<rootDir>config',
    '<rootDir>generators',
    '<rootDir>internals',
    '<rootDir>server',
    '<rootDir>webpack',
  ],
  verbose: false,
  testRegex: 'tests/.*\\.test\\.js$',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'png', 'jpg'],
};
