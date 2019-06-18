import HttpStatus from 'http-status-codes';

import { isInstance } from '../errors';


const getErrorHTTPStatusCode = (err) => {
  let statusCode;
  if (isInstance(err, 'UnProcessableEntityError')) {
    statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
  }
  if (isInstance(err, 'DocumentNotFoundError')) {
    statusCode = HttpStatus.NOT_FOUND;
  }
  if (isInstance(err, 'AssertionError')) {
    statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
  }
  return statusCode;
};

/**
 * Koa middleware function that serializes errors to JSON
 * @returns {import('koa').Middleware} Koa middleware
 */
const serializeError = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.statusCode = getErrorHTTPStatusCode(err);
    ctx.status = err.status || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      statusCode: ctx.status,
      result: ctx.body,
      error: {
        code: err.code,
        type: err.constructor.name,
        message: err.message,
      },
    };

    ctx.app.emit('error', err, ctx);
  }
};

export default serializeError;
