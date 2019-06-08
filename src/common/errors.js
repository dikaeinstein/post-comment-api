import assert, { AssertionError } from 'assert';


export class UnProcessableEntityError extends Error {}
export class DocumentNotFoundError extends Error {}
export class BadRequestError extends Error {}

/**
 * Factory function to create an UnProcessableEntityError
 * @param {string} message
 */
const makeUnProcessableEntityError = message => new UnProcessableEntityError(message);

/**
 * Factory function to create an DocumentNotFoundError
 * @param {string} message
 */
const makeDocumentNotFoundError = message => new DocumentNotFoundError(message);

const ErrorTypes = {
  AssertionError,
  DocumentNotFoundError,
  UnProcessableEntityError,
};

/**
 * Checks if err is an instance of errType
 * @param {Error} err
 * @param {string} errTypeName
 * @returns {boolean}
 */
const isInstance = (err, errTypeName) => {
  const errType = Object.keys(ErrorTypes).find(types => types === errTypeName);
  assert(errType, 'Unsupported error type name.');

  return err instanceof ErrorTypes[errType];
};

export { makeDocumentNotFoundError, makeUnProcessableEntityError, isInstance };
