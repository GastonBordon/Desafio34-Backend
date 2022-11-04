const pino = require("pino");

function buildWarnLogger() {
  const warnLogger = pino("./logs/warn.log");
  warnLogger.level = "warn";
  return warnLogger;
}

function buildErrorLogger() {
  const errorLogger = pino("./logs/error.log");
  errorLogger.level = "error";
  return errorLogger;
}

const logger = pino()


module.exports = { buildWarnLogger, buildErrorLogger, logger };
