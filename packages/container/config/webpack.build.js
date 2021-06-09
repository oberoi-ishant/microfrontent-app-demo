const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const PROD_DOMAIN = process.env.PRODUCTION_DOMAIN;

const buildConfig = {
  mode: "production",
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        products: `products@${PROD_DOMAIN}/products/v2/productsRemoteEntry.js`,
        authentication: `authentication@${PROD_DOMAIN}/authentication/v2/authenticationRemoteEntry.js`,
        dashboard: `dashboard@${PROD_DOMAIN}/dashboard/v2/dashboardRemoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, buildConfig);
