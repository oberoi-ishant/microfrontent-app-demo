const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const prodConfig = {
  mode: "production",
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/products/v2/'
  },
  plugins: [
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
