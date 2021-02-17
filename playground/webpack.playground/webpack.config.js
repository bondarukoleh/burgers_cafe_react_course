const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  devtools: 'cheap-module-eval-source-map',
  // resolve: {extensions: [".js", ".css"]},
  // module: {
  //   rules: [
  //     {test: /\.css$/, use: ["style-loader", "css-loader"]},
  //   ]
  // },
  devServer: {
    contentBase: "./src/assets",
    port: 4500
  }
};