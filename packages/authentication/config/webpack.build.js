const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const buildConfig = {
  mode: "production",
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/authentication/v2/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'authentication',
      filename: 'authenticationRemoteEntry.js',
      exposes: {
        './AuthenticationApp': './src/bootstrap'
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, buildConfig);