const path = require('path');
const fs = require('fs');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                    }
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    entry: {
        main: './src/main/index.ts',
        dev: './src/main/dev.ts',
        hexgrid: './src/hexgrid/index.ts',
        lsystem: './src/lsystem/index.ts',
        leafgen: './src/leafgen/index.ts',
        hexcomb: './src/hexcomb/index.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
};
