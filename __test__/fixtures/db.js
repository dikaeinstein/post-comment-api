/* eslint-disable no-unused-vars */
import { makeDocumentNotFoundError } from 'src/common/errors';


/**
 * @template T
 * @typedef {Object<Function, any>} Model Provides the interface to the data store.
 * @property {(doc, options?) => Promise<T>} create
 * @property {(condition, projections, options) => Promise<T[]>} find
 * @property {(condition) => Promise<T>} findOne
 * @property {(condition, attrs, options?) => Promise<T>} findOneAndUpdate
 * @property {(condition, options?) => Promise<T>} findOneAndRemove
 */

/**
 * @template T
 * @typedef {Object<Function,any>} DB The database connection
 * @property {(name: string, schema) => Model<T>} model
 */

let documentStore = [];

const create = (documents) => {
  if (Array.isArray(documents)) {
    documentStore = [...documentStore, ...documents];
  } else {
    documentStore.push(documents);
  }
  return Promise.resolve(documents);
};

const find = (query) => {
  if (query.postId) {
    const foundDocuments = documentStore
      .filter(document => document.postId === query.postId);
    return Promise.resolve(foundDocuments);
  }
  return Promise.resolve(documentStore);
};

const findOne = (query) => {
  const key = query.hash || query.id;
  const foundDocument = documentStore
    .find(document => document.hash === key || document.id === key);

  return Promise.resolve(foundDocument);
};

const findOneAndUpdate = (query, attrs) => {
  const key = query.hash || query.id;
  const foundDocument = documentStore
    .find(document => document.hash === key || document.id === key);

  if (!foundDocument) {
    throw makeDocumentNotFoundError('Document not found.');
  }
  const updatedDocument = { ...foundDocument, ...attrs };
  return Promise.resolve(updatedDocument);
};

const findOneAndRemove = (query) => {
  const key = query.hash || query.id;
  const foundDocument = documentStore
    .find(document => document.hash === key || document.id === key);

  if (!foundDocument) {
    throw makeDocumentNotFoundError('Document not found.');
  }
  documentStore = documentStore.filter(document => document.id !== query.id);
  return Promise.resolve(foundDocument);
};


const model = (name, schema) => ({
  create, find, findOne, findOneAndRemove, findOneAndUpdate,
});

/**
 * Factory function that creates an in-memory data store
 * @template T
 * @returns {DB<any>}
 */
const makeFakeDB = () => ({ model });

export default makeFakeDB;
