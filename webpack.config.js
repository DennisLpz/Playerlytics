const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./app/index.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    publicPath: "/build",
    proxy: {
      "/api/**": "http://localhost:3000",
    },
    // refactor to match up to any port. just have the file name.
  }, // add proxy /api local 3000;

  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
