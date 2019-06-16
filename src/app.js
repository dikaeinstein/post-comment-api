import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import responseTime from 'koa-response-time';
import HttpStatus from 'http-status-codes';

import logRequest from 'src/common/middlewares/logRequest';
import serializeError from 'src/common/middlewares/serializeError';
import comments from './comments';
import posts from './posts';


const rootHandler = async (ctx) => {
  ctx.status = HttpStatus.OK;
  ctx.body = { message: 'Welcome to post-comment-api.' };
};

/**
 *
 * @param {object} params
 * @param {import('common').Logger} params.logger
 * @return {Koa<any, {}>}
 */
const makeApp = ({ logger }) => {
  const app = new Koa();

  // X-Response-Time header
  app.use(responseTime());

  app.use(helmet());
  app.use(helmet.noCache());
  app.use(bodyParser());

  app.use(logRequest({ logger }));
  app.use(serializeError());

  const apiPrefix = process.env.API_PREFIX || '/';
  const rootAPIRouter = new Router({ prefix: apiPrefix });

  rootAPIRouter.get('/', rootHandler);

  /** @type {import('common').MiniApp[]} */
  const miniApps = [comments.router, posts.router];

  miniApps.forEach((miniApp) => {
    rootAPIRouter.use(miniApp.routes());
    rootAPIRouter.use(miniApp.allowedMethods());

    logger.debug(`Mounted ${apiPrefix}${miniApp.opts.prefix || '/'}`);
  });

  // Mount the API router within the app
  app.use(rootAPIRouter.routes());
  app.use(rootAPIRouter.allowedMethods());

  return app;
};

export default makeApp;
