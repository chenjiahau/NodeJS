const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
  mode: "production",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
    // new TerserPlugin(), because in production mode is default
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
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
      minify: true, // default is true on production mode
      chunks: ["index"], // entry point name
    }),
    new HtmlWebpackPlugin({
      title: "Hello World",
      filename: "image.html",
      description: "Image",
      template: "src/page_template.hbs",
      chunks: ["image"],
    }),
  ],
};

module.exports = config;
