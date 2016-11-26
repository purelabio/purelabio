'use strict'

const bs = require('browser-sync').create()
const mapValues = require('lodash/mapValues')

const prod = process.env.NODE_ENV === 'production'

const config = require('./webpack.config')
const compiler = require('webpack')(prod ? config : extend(config, {
  entry: mapValues(config.entry, x => ['webpack-hot-middleware/client', x])
}))

bs.init({
  startPath: '/',
  server: {
    baseDir: 'dist',
    middleware: [
      require('webpack-dev-middleware')(compiler, {
        publicPath: '/',
        stats: config.stats,
      }),
      ...(prod ? [] : [
        require('webpack-hot-middleware')(compiler),
      ]),
      require('connect-history-api-fallback')(),
    ]
  },
  port: 23467,
  files: 'dist',
  open: false,
  online: false,
  ui: false,
  ghostMode: false,
  notify: false
})

function extend (...args) {
  return args.reduce(Object.assign, {})
}
