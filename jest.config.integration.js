const config = require('./jest.config');


console.log('Running Integration Tests');
console.log('')

module.exports = {
  ...config,
  testMatch: ['**/__test__/**/*.(spec|test).[jt]s'],
};
