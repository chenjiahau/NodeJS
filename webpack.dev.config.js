const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    index: "./src/index_page.js",
    image: "./src/image_page.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"), // abolsute path
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist"), // abolsute path
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true, // generate files in memory and doesn't save them to disk
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3kb
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        path.resolve(__dirname, "./build/**/*"),
      ],
    }),
    new HtmlWebpackPlugin({
      title: "Hello World",
      filename: "index.html",
      template: "src/page_template.hbs",
      description: "Description",
      minify: false,
      chunks: ["index"], // entry point name
    }),
    new HtmlWebpackPlugin({
      title: "Hello World",
      filename: "image.html",
      description: "Image",
      template: "src/page_template.hbs",
      minify: false,
      chunks: ["image"],
    }),
  ],
};

module.exports = config;
