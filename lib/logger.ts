// Logger utility that only logs in development mode

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
  
  error: (...args: unknown[]) => {
    if (isDevelopment) {
      console.error(...args)
    }
    // In production, send errors to monitoring service (optional)
    // Example: sendErrorToMonitoring(...args)
  },
  
  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },
  
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },
  
  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(...args)
    }
  }
}

