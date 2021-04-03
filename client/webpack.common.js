const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {

    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template/template.html'
        }),
        new Dotenv() 
    ],
    module: {
        rules: [

            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                        outputPath: "imgs"
                    }

                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:5000',
          }
    }
};

