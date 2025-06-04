module.exports = {
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/src/js/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  verbose: true,
};