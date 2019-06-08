import pino from 'pino';


/**
 * @typedef {Object} Logger
 * @property {Function} info
 * @property {Function} debug
 * @property {Function} warn
 * @property {Function} error
 */


/**
 * Initialize logger
 * @param {object} params
 * @param {object} params.config
 * @param {string} params.name
 * @param {string} params.level
 * @returns {Logger}
 */
const initializeLogger = ({ config, name, level }) => {
  const isDevelopment = config.NODE_ENV === 'development';
  return pino({
    name,
    level,
    useLevelLabels: !isDevelopment,
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  });
};

export default initializeLogger;
