const LOG_LEVELS = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
  DEBUG: "DEBUG",
};

const COLORS = {
  ERROR: "\x1b[31m",
  WARN: "\x1b[33m",
  INFO: "\x1b[36m",
  DEBUG: "\x1b[35m",
  RESET: "\x1b[0m",
};

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || "INFO";
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaString = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";
    return `${COLORS[level]}[${timestamp}] [${level}]${COLORS.RESET} ${message}${metaString}`;
  }

  error(message, meta = {}) {
    console.error(this.formatMessage(LOG_LEVELS.ERROR, message, meta));
  }

  warn(message, meta = {}) {
    console.warn(this.formatMessage(LOG_LEVELS.WARN, message, meta));
  }

  info(message, meta = {}) {
    console.info(this.formatMessage(LOG_LEVELS.INFO, message, meta));
  }

  debug(message, meta = {}) {
    if (this.logLevel === "DEBUG") {
      console.debug(this.formatMessage(LOG_LEVELS.DEBUG, message, meta));
    }
  }
}

export default new Logger();
