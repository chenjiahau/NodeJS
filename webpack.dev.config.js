const path = require('path');

module.exports = {
  entry: {
    index: "./src/index.ts"
  },
  devtool: 'inline-source-map',
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  devServer: {
    port: 9000,
    static: './dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};