const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const buildConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: '/dashboard/v2/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "dashboardRemoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap"
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, buildConfig);
