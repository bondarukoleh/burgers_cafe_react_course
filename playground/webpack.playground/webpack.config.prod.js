const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  resolve: {extensions: [".js", ".css"]},
  module: {
    rules: [
      {test: /\.js$|jsx/, loader: "babel-loader", exclude: [/node_modules/]},
      {test: /\.css$/, use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]'
              }
            }
          },
          {
            loader: "postcss-loader",
            // options: {
            //   postcssOptions: {
            //     plugins: 'asd',
            //   },
            // },
          },
          ], exclude: [/node_modules/]},
      {
        test: /\.png|jpe?g|gif/,
        loader: "url-loader",
        options: {
          limit: '8000',
          name: 'images/[name].[ext]'
        },
        exclude: [/node_modules/]
      },
    ]
  },
  devServer: {
    contentBase: "./src/index.html",
    port: 4500
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body'
    })
  ]
};
