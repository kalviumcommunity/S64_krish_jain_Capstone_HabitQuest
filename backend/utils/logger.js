const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

class Logger {
  constructor() {
    this.isProd = process.env.NODE_ENV === 'production';
  }

  error(message, error = null, context = {}) {
    // Always log errors, but sanitize in production
    const errorDetails = this.isProd ? 
      { code: error?.name || 'ERROR' } : 
      { 
        code: error?.name || 'ERROR',
        message: error?.message,
        stack: error?.stack
      };

    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: LOG_LEVELS.ERROR,
      message,
      ...errorDetails,
      ...this.sanitizeContext(context)
    }));
  }

  warn(message, context = {}) {
    console.warn(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: LOG_LEVELS.WARN,
      message,
      ...this.sanitizeContext(context)
    }));
  }

  info(message, context = {}) {
    if (!this.isProd) {
      console.info(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: LOG_LEVELS.INFO,
        message,
        ...this.sanitizeContext(context)
      }));
    }
  }

  debug(message, context = {}) {
    if (!this.isProd) {
      console.debug(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: LOG_LEVELS.DEBUG,
        message,
        ...this.sanitizeContext(context)
      }));
    }
  }

  // Remove sensitive data from context
  sanitizeContext(context) {
    const sanitized = { ...context };
    const sensitiveFields = ['password', 'token', 'secret', 'authorization'];
    
    Object.keys(sanitized).forEach(key => {
      if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
        sanitized[key] = '[REDACTED]';
      }
    });

    return sanitized;
  }
}

module.exports = new Logger(); 