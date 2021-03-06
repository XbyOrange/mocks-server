"use strict";

const winston = require("winston");

const format = winston.format.printf(info => {
  return `${info.timestamp} [Mocks ${info.level}] ${info.message}`;
});

const transports = {
  console: new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: "HH:mm:ss:SS"
      }),
      format
    )
  })
};

const logger = winston.createLogger({
  transports: [transports.console]
});

logger.silly = logger.silly.bind(logger);
logger.debug = logger.debug.bind(logger);
logger.verbose = logger.verbose.bind(logger);
logger.info = logger.info.bind(logger);
logger.warn = logger.warn.bind(logger);
logger.error = logger.error.bind(logger);

const set = (transport, level) => {
  if (level === "silent") {
    transports[transport].silent = true;
  } else {
    transports[transport].silent = false;
    transports[transport].level = level;
  }
};

module.exports = {
  silly: logger.silly,
  debug: logger.debug,
  verbose: logger.verbose,
  info: logger.info,
  warn: logger.warn,
  error: logger.error,
  set: set
};
