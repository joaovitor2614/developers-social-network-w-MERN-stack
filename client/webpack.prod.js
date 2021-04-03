const path = require('path')
const webpack = require('webpack');
const common = require("./webpack.common")
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

require('dotenv').config({ path: '.env' });

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.APP_ID': JSON.stringify(process.env.APP_ID),
            'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
            'process.env.AUTH_DOMAIN': JSON.stringify(process.env.AUTH_DOMAIN),
            'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL),
            'process.env.PROJECT_ID': JSON.stringify(process.env.PROJECT_ID),
            'process.env.STORAGE_BUCKET': JSON.stringify(process.env.STORAGE_BUCKET),
            'process.env.MSG_SENDER_ID': JSON.stringify(process.env.MSG_SENDER_ID)
          })
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader, // extrai css nos arquivos
                    "css-loader", //2_transformar css em commonjs
                    "sass-loader" // 1_transformar scss em css
                ]
            }
        ]
    }
})
