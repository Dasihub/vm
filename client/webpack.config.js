const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.tsx')],
    output: {
        filename: "js/vm.js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    devServer: {
        port: 3000,
        historyApiFallback: true,
        open: true
    },
    target: 'web',
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    performance: {
        hints: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(pdf|png|jpeg|jpg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        // options: {
                        //     name: '/assets/[name].[ext]'
                        // }
                    }
                ]
            }
        ]
    }
}