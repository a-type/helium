const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

module.exports = {
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  entry: path.resolve(__dirname, './index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
        ],
      },
    ],
  },
  watch: process.env.NODE_ENV !== 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new Serve({
      host: 'localhost',
      port: 8080,
      progress: 'minimal',
      liveReload: true,
      historyFallback: {
        rewrites: [
          {
            from: '/wps',
            to: context => context.parsedUrl.pathname,
          },
        ],
      },
      static: [path.resolve(__dirname, 'dist'), './public'],
    }),
  ],
};
