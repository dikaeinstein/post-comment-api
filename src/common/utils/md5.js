import crypto from 'crypto';


/**
 * Generate md5 hash for content
 * @param {string} text
 * @returns {string}
 */
const md5 = text => crypto
  .createHash('md5')
  .update(text, 'utf8')
  .digest('hex');

export default md5;
