const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        main: './src/main/index.ts',
        dev: './src/main/dev.ts',
        lsystem: './src/lsystem/index.ts',
        leafgen: './src/leafgen/index.ts',
        hexcomb: './src/hexcomb/index.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.runtime.esm-bundler.js',
            // '@': __dirname,
        },
        extensions: ['.tsx', '.ts', '.js', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.(png|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {}
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                ]
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 5001,
        hot: true,
        disableHostCheck: true,
        writeToDisk: true,
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new HotModuleReplacementPlugin(),
    ]
};
