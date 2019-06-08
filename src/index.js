import initializeLogger from 'src/common/logger';
import justMyCode from 'src/common/utils/justMyCode';
import { db as commentsDB } from './comments';
import { db as postsDB } from './posts';
import makeApp from './app';


const config = process.env;

const logger = initializeLogger({
  config,
  name: 'post-comment-api',
  level: config.LOG_LEVEL,
});

const app = makeApp({ logger });

app.on('error', (err, ctx) => {
  const errorInfo = {
    tag: ctx.state.tag,
    status: ctx.status,
    exception: err.constructor.name,
    stack: justMyCode(err.stack),
  };

  logger.error(errorInfo,
    `${ctx.ip} => ${ctx.method} ${ctx.originalUrl} ${ctx.status}`);
});

export default Object.freeze({
  app, commentsDB, postsDB, logger,
});
export {
  app, commentsDB, postsDB, logger,
};
