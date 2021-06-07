const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const PROD_DOMAIN = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        products: `products@${PROD_DOMAIN}/products/latest/productsRemoteEntry.js`,
        authentication: `authentication@${PROD_DOMAIN}/authentication/latest/authenticationRemoteEntry.js`,
        dashboard: `dashboard@${PROD_DOMAIN}/dashboard/latest/dashboardRemoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
