'use strict'

const bs = require('browser-sync').create()
const proxy = require('http-proxy').createProxyServer()
const config = require('./webpack.config')

const prod = process.env.NODE_ENV === 'production'

proxy.on('error', err => {
  console.error(err)
})

bs.init({
  startPath: '/info/',
  server: {
    baseDir: 'dist',
    middleware: [
      ...(prod ? [] : hmr()),
      (req, res, next) => {
        if (shouldShorten(req.url)) {
          req.url = req.url.replace(/^\/info\//, '').replace(/^[/]*/, '/')
        }
        next()
      },
      (req, res, next) => {
        if (/^\/api\//.test(req.url)) {
          proxy.web(req, res, {target: 'http://web.tobox.ru'})
        } else {
          next()
        }
      }
    ]
  },
  port: 8888,
  files: 'dist',
  open: false,
  online: false,
  ui: false,
  // ghostMode: false,
  notify: false
})

function hmr () {
  const compiler = require('webpack')(extend(config, {
    entry: ['webpack-hot-middleware/client', config.entry]
  }))

  return [
    require('webpack-dev-middleware')(compiler, {
      publicPath: '/info',
      noInfo: true
    }),
    require('webpack-hot-middleware')(compiler)
  ]
}

function shouldShorten (url) {
  return /info\/app.js/.test(url)
    ? !prod
    : true
}

function extend () {
  return [].reduce.call(arguments, assign, {})
}

function assign (left, right) {
  return Object.assign(left, right)
}
