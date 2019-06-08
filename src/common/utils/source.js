/**
 * @typedef {Readonly<{
 *   getIp: () => string;
 *   getBrowser: () => string;
 *   getReferer: () => string;
 * }>} Source
 */

/**
 * @callback MakeSource
 * @param {{
 *  browser: string;
 *  entityName: string;
 *  ip: string;
 *  referer: string;
 *  makeError: (message: string) => Error;
 * }} options
 * @returns {Source}
 */

/**
 * buildMakeSource is a factory function that creates a function to create a source
 * @param {object} params
 * @param {(ip: string) => boolean} params.isValidIP
 * @returns {MakeSource}
 */
const buildMakeSource = ({ isValidIP }) => ({
  ip, browser, entityName, referer, makeError,
}) => {
  if (!ip) {
    throw makeError(`${entityName} source must contain an IP.`);
  }

  if (!isValidIP(ip)) {
    throw makeError(`${entityName} source must contain a valid IP.`);
  }

  return Object.freeze({
    getIp: () => ip,
    getBrowser: () => browser,
    getReferer: () => referer,
  });
};

export default buildMakeSource;
