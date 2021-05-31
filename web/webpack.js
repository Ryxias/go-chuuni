const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, '../dist/web'),
  assets: path.resolve(__dirname, 'src', 'assets'),
  dist_assets: path.resolve(__dirname, '../dist/web/assets'),
}

module.exports = {
  mode: 'development',
  resolve: {
    modules: [
      PATHS.src,
      'node_modules',
    ],
  },
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(PATHS.src, 'index.jsx'),
    ],
  },
  output: {
    path: PATHS.dist,
    // Here we intentionally move bundle.js to a separate directory from index.html
    // so that we can coerce all 404s onto the index file in API gateway
    filename: 'assets/bundle.js',
    publicPath: '/',
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: PATHS.assets,
      to: PATHS.public,
    }], {
      copyUnmodified: true,
      ignore: [
        '*.ejs',
        'jss/**/*',
        'img/**/*',
        'scss/**/*',
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.assets, 'index.ejs'),
      filename: 'index.html',
      publicPath: '/',
    }),
  ],
  devServer: {
    disableHostCheck: true,
    contentBase: PATHS.dist,
    hot: false,
    inline: false,
    port: 8080,
    host: '0.0.0.0',
    historyApiFallback: true,
    proxy: {
      '/_api': {
        target: 'http://0.0.0.0:3000',
      },
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: PATHS.src,
      exclude: /node_modules/,
      resolve: {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
          ],
        },
      }],
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      include: PATHS.src,
      loader: 'eslint-loader',
      options: {
        failOnWarning: false,
        failOnError: false,
      },
    }, {
      test: /\.md$/,
      exclude: /node_modules/,
      include: PATHS.src,
      loader: 'raw-loader',
      options: {
        esModule: false,
      },
    }],
  },
}
