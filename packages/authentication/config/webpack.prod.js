const { merge } = require('webpack-merge');
const devConfig = require('./webpack.dev');

const prodConfig = {
  mode: "production"
};

module.exports = merge(devConfig, prodConfig);
