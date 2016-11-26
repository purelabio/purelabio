'use strict'

const pt = require('path')
const webpack = require('webpack')
const realpathSync = require('fs').realpathSync
const prod = process.env.NODE_ENV === 'production'

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
      },
      ...(prod ? [
        // disable dev features and warnings in React and react-router
        {
          test: /react.*\.jsx?$/,
          include: /node_modules/,
          loader: 'transform?envify'
        }
      ] : [])
    ],
  },

  resolveLoader: {
    root: [realpathSync('node_modules')]
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      React: 'react'
    }),
    ...(prod ? [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {warnings: false, screw_ie8: true},
        mangle: true
      }),
    ] : [
      new webpack.HotModuleReplacementPlugin(),
    ]),
  ],

  stats: {
    colors: true,
    chunks: false,
    version: false,
    hash: false,
    assets: false
  }
}
