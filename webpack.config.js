/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: [
    './scripts/client/index'
  ],
  output: {
    path: __dirname+'/views/js/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'scripts/client')
      }
    ]
  }
};