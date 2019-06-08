/**
 * Splits a stack trace and removes lines that reference node_modules
 * @param {string} stackString
 * @returns {string}
 */
const justMyCode = (stackString) => {
  if (typeof stackString !== 'string') return null;

  return stackString
    .split(/(\r|\n)/g)
    .map(line => line.trim())
    .filter(line => line && !line.match(/\/node_modules\//i))
    .join('\n');
};

export default justMyCode;
