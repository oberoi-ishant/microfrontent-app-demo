const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  devtool: 'eval-source-map',
  output: {
    publicPath: 'http://localhost:8080/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        products: 'products@http://localhost:8081/productsRemoteEntry.js',
        authentication: `authentication@http://localhost:8082/authenticationRemoteEntry.js`,
        dashboard: 'dashboard@http://localhost:8083/dashboardRemoteEntry.js'
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, devConfig);