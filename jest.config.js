module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['src/**/*.js', '!src/bin/www.js', '!src/**/*.spec.js'],
  moduleDirectories: ['node_modules', '.'],
  setupFilesAfterEnv: ['jest-extended'],
};
