import pino from 'pino';


/**
 * Initialize logger
 * @param {object} params
 * @param {object} params.config
 * @param {string} params.name
 * @param {string} params.level
 * @returns {import('common').Logger}
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
