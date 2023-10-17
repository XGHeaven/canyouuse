const path = require('path');
const preprocess = require('svelte-preprocess');

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
  entry: {
    main: './src/theme/index.ts',
    // Feature: './src/theme/web-components/Feature.svelte'
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
    path: path.resolve(__dirname, 'lib/theme'),
  },
  builtins: {
    html: [{ template: './src/theme/index.html' }],
  },
  resolve: {
    alias: {
    //   svelte: path.dirname(require.resolve('svelte/package.json')),
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        include: /web-components\//,
        use: [
          {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                customElement: true,
              },

              preprocess: preprocess(),
            },
          },
        ],
      },
      {
        test: /\.svelte$/,
        exclude: /web-components\//,
        use: [
          {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
              },
              emitCss: true,
              hotReload: true,
              preprocess: preprocess(),
            },
          },
        ],
      },
    ],
  },
};
