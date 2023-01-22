const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

//help to read process.env
dotenv.config();

module.exports = {
    mode: "production",
    entry: "/src/index.js",
    output: {path: path.resolve(__dirname, "build"),
             filename: "frontend.bundle.js"},
    resolve: {
        extensions: ['', '.js', '.jsx']
    },      
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    }
                },
            },

            {
                test: /\.((c|sa|sc)ss)$/i,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        //inject: false prevent additional <script></script> in index.html which disable all object event
          inject: false,
          template: path.resolve( __dirname, 'public/index.html' ),
          filename: 'index.html',
          favicon: 'public/favicon.ico'
        }),
        // resolve the process undefined error
        new webpack.ProvidePlugin({
            process: "process/browser",
         }),
         // read the process.env
         new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
         }),
      ],
};