/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');
const [server, client] = require('nullstack/webpack.config');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const plugins = [new TsconfigPathsPlugin({})];

function custom_client(...args) {
  const config = client(...args);

  const { rules } = config.module;

  const sass_rule = {
    test: /\.scss/,
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: [join(__dirname, 'src', 'styles')],

        logger: {
          warn: console.warn,
          debug: console.log,
        },
      },
    },
  };

  rules.push(sass_rule);
  config.resolve.plugins = [...(config.resolve?.plugins || []), ...plugins];

  return config;
}

function custom_server(...args) {
  const config = server(...args);

  const { rules } = config.module;

  const sass_rule = {
    test: /\.scss/,
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: [join(__dirname, 'src', 'styles')],

        logger: {
          warn: console.warn,
          debug: console.log,
        },
      },
    },
  };

  rules.push(sass_rule);
  config.resolve.plugins = [...(config.resolve?.plugins || []), ...plugins];

  return config;
}

module.exports = [custom_server, custom_client];
