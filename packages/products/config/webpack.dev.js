const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  devtool: 'eval-source-map',
  output: {
    publicPath: 'http://localhost:8081/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'productsRemoteEntry.js',
      exposes: {
        './ProductsApp': './src/bootstrap'
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};

module.exports = merge(commonConfig, devConfig);