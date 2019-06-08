/**
 * @typedef {object} Response
 * @property {object} headers
 * @property {number} statusCode
 * @property {object} [body]
 */

/**
 * @typedef {object} Request
 * @property {object} headers
 * @property {object} [query]
 * @property {object} [params]
 * @property {object} [body]
 * @property {string} ip
 */

/**
 * @callback KoaController
 * @param {import('koa').Context} ctx
 */

/**
 * @callback Controller
 * @param {Request} httpRequest
 * @returns {Promise<Response | Error>}
 */

/**
 * Factory function to create a koa middleware
 * @param {Controller} controller
 * @returns {KoaController}
 */
const makeKoaController = controller => async (ctx) => {
  try {
    const req = ctx.request;

    const httpRequest = {
      body: req.body,
      query: req.query,
      params: ctx.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };

    const httpResponse = /** @type {Response} */ (await controller(httpRequest));

    ctx.status = httpResponse.statusCode;
    ctx.body = httpResponse.body;
  } catch (error) {
    throw error;
  }
};

export default makeKoaController;
