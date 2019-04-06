const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill', 
    './src/index.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            cacheDirectory: true,
            presets: ['es2015', 'react'],
        }
      }
    ]
  }
};
