import cuid from 'cuid';


/**
 * @typedef {Object<Function>} Id
 * @property {() => string} makeId Call this function to create an id
 * @property {(cuid: string) => boolean} isValid Check the if id is valid
 */

/**
 * @type {Id} id
 */
const id = {
  makeId: cuid,
  isValid: cuid.isCuid,
};

export default id;
