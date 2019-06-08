import assert from 'assert';

import mongoose from 'mongoose';


/**
 * @typedef {object} ExtendedPrototype
 * @property {string} host
 * @property {string} name
 * @property {string} port
*/

/** @typedef {import('mongoose').Connection & Partial<ExtendedPrototype>} Connection */

/**
 * @typedef {Connection & {
    then: Promise<Connection>["then"];
    catch: Promise<Connection>["catch"];
  }} ConnectionPromise
*/

/**
 * Factory method that creates a connection to a Mongo database
 * @param {string} connectionUrl
 * @returns {ConnectionPromise}
 */
const connectToDatabase = (connectionUrl) => {
  assert(typeof connectionUrl === 'string' && connectionUrl.length,
    'DB connection string is required');

  // These options avoid deprecation warnings
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  return mongoose.createConnection(connectionUrl, options);
};

export default connectToDatabase;
