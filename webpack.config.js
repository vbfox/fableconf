var path = require("path");
var webpack = require("webpack");

function resolve(filePath) {
  return path.join(__dirname, filePath)
}

var babelOptions = {
  presets: [["es2015", { "modules": false }]],
  plugins: ["transform-runtime"]
};

var isProduction = process.argv.indexOf("-p") >= 0;
console.log("Bundling for " + (isProduction ? "production" : "development") + "...");

module.exports = {
  devtool: "source-map",
  entry: resolve('./fableconf.fsproj'),
  output: {
    filename: 'bundle.js',
    path: resolve('.'),
  },
  resolve: {
    modules: [
      "node_modules", resolve("./node_modules/")
    ]
  },
  devServer: {
    contentBase: resolve('.'),
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.fs(x|proj)?$/,
        use: {
          loader: "fable-loader",
          options: {
            babel: babelOptions,
            define: isProduction ? [] : ["DEBUG"],
            extra: { useCache: true }
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        },
      },
      {
        test: /\.sass$/,
        use: [
          "style-loader",
          "css-loader?url=false",
          "sass-loader"
        ]
      }
    ]
  }
};