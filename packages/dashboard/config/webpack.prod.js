const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const prodConfig = {
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: '/index.html'
    },
    headers: { /** to load some fonts when loaded from container */
      'Access-Control-Allow-Origin': '*'
    }
  },
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: 'http://localhost:8083/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "dashboardRemoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap"
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
