const merge = require('lodash/merge')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.REACT_APP_PUBLIC_URL || '',
    host: process.env.REACT_APP_HOST || 'localhost',
    isBrowser: typeof window !== 'undefined',
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    version: process.env.REACT_APP_VERSION || '0.0.0',
    branch: process.env.REACT_APP_BRANCH || 'dev',
    port: process.env.REACT_APP_PORT || 3000,
  },
  test: {},
  development: {},
  production: {},
}

module.exports = merge(config.all, config[config.all.env], window.__CONFIG__)
