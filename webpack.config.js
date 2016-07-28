'use strict'

const pt = require('path')
const webpack = require('webpack')
const prod = process.env.NODE_ENV === 'production'
const realpathSync = require('fs').realpathSync

module.exports = {
  entry: pt.resolve('src/js/app.js'),

  output: {
    path: pt.join(process.cwd(), 'dist'),
    filename: 'app.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          realpathSync('src/js')
        ],
        exclude: [
        ]
      },
      {test: /\.json$/, loader: 'json'}
    ].concat(!prod ? [] : [
      // disable dev features and warnings in React
      {
        test: /react.*\.jsx?$/,
        include: /node_modules/,
        loader: 'transform?envify'
      }
    ])
  },

  resolve: {
    alias: {
      react: realpathSync('node_modules/react'),
      'react-dom': realpathSync('node_modules/react-dom'),
      // `lodash/fp` internally requires `lodash.min`. We must use this file
      // to avoid duplication.
      lodash: pt.resolve('node_modules/lodash/lodash.min'),
      // `lodash/fp` has to be aliased to avoid confusing webpack.
      'lodash-fp': realpathSync('node_modules/lodash/fp'),
      prax: realpathSync('node_modules/prax')
    }
  },

  resolveLoader: {
    root: [realpathSync('node_modules')]
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      React: 'react',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ].concat(!prod ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {warnings: false, screw_ie8: true},
      mangle: true
    })
  ]),

  devtool: prod ? 'source-map' : null,

  stats: {
    colors: true,
    chunks: false,
    version: false,
    hash: false,
    assets: false
  }
}
