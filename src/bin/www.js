import http from 'http';
import os from 'os';

import dotenv from 'dotenv';

// Load config from the .env file (if exists)
dotenv.config();

const {
  app, commentsDB, postsDB, logger,
} = require('..');

// Get the hostname and port to listen on
const hostname = process.env.HOSTNAME || os.hostname() || '127.0.0.1';
const port = process.env.PORT || 8050;

// Creates a http server ready to listen.
const server = http.createServer(app.callback());

postsDB
  .then(async (pDB) => {
    logger.info(`Connected to postsDB ${pDB.host}:${pDB.port} (${pDB.name}) successfully `);
    try {
      const cDB = await commentsDB;
      logger.info(`Connected to commentsDB ${cDB.host}:${cDB.port} (${cDB.name}) successfully `);
      server.listen({ port, host: hostname }, () => {
        logger.info(`API is listening on ${hostname}:${port}...`);
      });
    } catch (err) {
      logger.error(`Unable to connect to commentsDB: ${err.message}`);
      process.exit(1);
    }
  })
  .catch((err) => {
    logger.error(`Unable to connect to postsDB: ${err.message}`);
    process.exit(1);
  });

// Log all database events
commentsDB.on('disconnected', () => {
  logger.warn(`Lost connection to database ${commentsDB.host}:${commentsDB.port} (${commentsDB.name})`);
});

postsDB.on('disconnected', () => {
  logger.warn(`Lost connection to database ${postsDB.host}:${postsDB.port} (${postsDB.name})`);
});

commentsDB.on('error', (err) => {
  logger.error(`commentsDB error: ${err.message}`);
});

postsDB.on('error', (err) => {
  logger.error(`postsDB error: ${err.message}`);
});

process.on('SIGINT', () => {
  logger.info('Closing database connections...');
  commentsDB.close();
  logger.info('commentsDB closed.');
  postsDB.close();
  logger.info('postsDB closed.');

  logger.info('Shutting down server...');
  logger.info('Server successfully shutdown.');
  process.exit(0);
});
