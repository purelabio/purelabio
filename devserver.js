'use strict'

const bs = require('browser-sync').create()
const mapValues = require('lodash/mapValues')

const config = require('./webpack.config')
const compiler = require('webpack')(extend(config, {
  entry: mapValues(config.entry, x => ['webpack-hot-middleware/client', x])
}))

bs.init({
  startPath: '/',
  server: {
    baseDir: 'dist',
    middleware: [
      require('webpack-dev-middleware')(compiler, {
        publicPath: '/',
        noInfo: true
      }),
      require('webpack-hot-middleware')(compiler),
      require('connect-history-api-fallback')()
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
