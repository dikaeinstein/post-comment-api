/**
 * buildIsValidIP is a factory function that creates the isValidIP function
 * @param {object} params
 * @param {import('joi')} params.schemaBuilder
 * @returns {(ip: string) => boolean}
 */
const buildIsValidIP = ({ schemaBuilder }) => (ip) => {
  // Accept only ipv4 and ipv6 addresses with a CIDR
  const IPSchema = schemaBuilder.string().ip({
    version: [
      'ipv4',
      'ipv6',
    ],
  }).required();

  const result = schemaBuilder.validate(ip, IPSchema);

  if (result.error) {
    return false;
  }
  return true;
};

export default buildIsValidIP;
