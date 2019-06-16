/**
 * Middleware function that logs each incoming request and outgoing response
 * @param {object} params
 * @param {import('common').Logger} params.logger
 * @returns {import('koa').Middleware} Koa middleware
 */
const logRequest = ({ logger }) => async (ctx, next) => {
  const requestInfo = {
    direction: 'inbound',
    ip: ctx.ip,
    method: ctx.method,
    url: ctx.originalUrl,
    type: ctx.request.type,
    length: ctx.request.length,
    headers: ctx.request.headers,
    query: ctx.request.query,
    body: ctx.request.body,
  };

  // Log the request coming in
  const startTime = Date.now();
  logger.info(requestInfo,
    `${ctx.ip} => ${ctx.method} ${ctx.originalUrl}, ${ctx.request}`);

  await next();
  const endTime = Date.now();
  const elapsedTime = Math.max(1, endTime - startTime);

  const responseInfo = {
    direction: 'outbound',
    ip: ctx.ip,
    method: ctx.method,
    url: ctx.originalUrl,
    status: ctx.status,
    type: ctx.type,
    length: ctx.length,
    elapsed: elapsedTime,
  };

  // Log the response going out
  logger.info(responseInfo,
    `${ctx.ip} <= ${ctx.method} ${ctx.url} ${ctx.status} - ${elapsedTime}ms`);
};

export default logRequest;
