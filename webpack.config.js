const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"), // abolsute path
    filename: "bundle.js",
  },
  mode: "none",
};

module.exports = config;
