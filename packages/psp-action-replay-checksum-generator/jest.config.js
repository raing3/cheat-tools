module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: '../build/coverage',
  automock: true,
  resetModules: true,
  clearMocks: true,
  timers: 'fake'
};
