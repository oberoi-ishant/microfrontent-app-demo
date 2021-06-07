const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const prodConfig = {
  mode: "production",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: 'http://localhost:8081/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'productsRemoteEntry.js',
      exposes: {
        './ProductsApp': './src/bootstrap'
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
