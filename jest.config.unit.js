const config = require('./jest.config');


console.log('Running Unit Tests');
console.log('');

module.exports = {
  ...config,
  testMatch: ['**/src/**/*.(spec|test).[jt]s'],
};
