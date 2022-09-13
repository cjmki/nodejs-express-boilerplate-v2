const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const esLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: path.join(__dirname, './src/server.js'),

  output: {
    filename: 'server.js',
    path: path.join(__dirname, './build'),
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  plugins: [new esLintPlugin()],
  externals: [webpackNodeExternals()],
  stats: {
    assets: true,
    modules: false,
    children: false,
  },
};
