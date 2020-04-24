const path = require('path');

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
        leafgen: './src/leafgen/index.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'static/build'),
    },
};
