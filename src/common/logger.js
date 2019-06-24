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
  const isNonTest = !['testing', 'test'].includes(config.NODE_ENV.toLowerCase());
  return pino({
    enabled: isNonTest,
    name,
    level,
    useLevelLabels: !isDevelopment,
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  });
};

export default initializeLogger;
