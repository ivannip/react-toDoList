const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./server.js",
    mode: "production",
    target: "node",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                ecma: 2019
            }
        })],
    },
    output: {
        path: path.resolve(__dirname, '.'),
        filename: "server.bundle.js"
    },
    plugins: [
        // read the process.env
        new webpack.DefinePlugin({
           'process.env': JSON.stringify(process.env)
        }),
   ],
}

