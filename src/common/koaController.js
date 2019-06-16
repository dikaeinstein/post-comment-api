/**
 * Factory function to create a koa middleware
 * @param {import('common').HTTPController} controller
 * @returns {import('common').KoaController}
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

    const httpResponse = /** @type {import('common').Response} */ (
      await controller(httpRequest));

    ctx.status = httpResponse.statusCode;
    ctx.body = httpResponse.body;
  } catch (error) {
    throw error;
  }
};

export default makeKoaController;
