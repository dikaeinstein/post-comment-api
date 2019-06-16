import initializeLogger from 'src/common/logger';
import justMyCode from 'src/common/utils/justMyCode';
import comments from './comments';
import posts from './posts';
import makeApp from './app';


const config = process.env;

export const logger = initializeLogger({
  config,
  name: 'post-comment-api',
  level: config.LOG_LEVEL,
});

export const app = makeApp({ logger });

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

export const commentsDB = comments.db;
export const postsDB = posts.db;
