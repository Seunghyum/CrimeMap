const webpack = require('webpack');

module.exports = {
  entry: [ 
    './src/index.js',
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server'
  ],
  output: {
    path: '/',
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
            plugins: ["react-hot-loader/babel"]
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    hot: true,
    publicPath: '/',
    contentBase: './public',
    filename: 'bundle.js',
    // historyApiFallback: true,
    proxy: {
        "/api": "http://localhost:3000"
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};
