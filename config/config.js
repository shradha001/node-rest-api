'use strict';

const serverConfig = {
  PORT: process.env.PORT || 9596
};

const dbConfig = {
  database: process.env.DB_NAME || 'demo'
};

const respCodeAndMsg = {
  STATUS_CODE: {
    OK: 200,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401
  },
  ERR_MSG: {
    BAD_REQUEST: 'Bad Request',
    NOT_FOUND: 'Not Found'
  }
};

const constants = {
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  }
};

module.exports = {
  serverConfig,
  dbConfig,
  constants,
  respCodeAndMsg
};
