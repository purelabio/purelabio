'use strict'

const pt = require('path')
const webpack = require('webpack')
const realpathSync = require('fs').realpathSync

module.exports = {
  entry: {
    app: pt.resolve('src/scripts/app.js')
  },

  output: {
    path: pt.join(process.cwd(), 'dist'),
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          realpathSync('src/scripts')
        ]
      }
    ]
  },

  resolveLoader: {
    root: [realpathSync('node_modules')]
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      React: 'react'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],


  stats: {
    colors: true,
    chunks: false,
    version: false,
    hash: false,
    assets: false
  }
}
