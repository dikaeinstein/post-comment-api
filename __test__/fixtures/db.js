/* eslint-disable no-unused-vars */
import { makeDocumentNotFoundError } from 'src/common/errors';


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

/**
 * @template T
 * @param {string} name
 * @param {*} [sch]
 * @returns {import('model').Model<T>}
 */
const model = (name, sch) => ({
  create, find, findOne, findOneAndRemove, findOneAndUpdate,
});

/**
 * Factory function that creates an in-memory data store
 * @returns {object}
 */
const makeFakeDB = () => ({ model });

/**
 * Factory function that creates a model using an in-memory fake DB
 * @template T
 * @param {string} name
 * @param {*} [schema]
 * @returns {import('model').Model<T>}
 */
const makeFakeModel = (name, schema) => model(name, schema);

export default makeFakeDB;
export { makeFakeModel };
