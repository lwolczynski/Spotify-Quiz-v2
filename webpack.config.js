const webpack = require('webpack');

module.exports = {
    resolve: {
        alias: {
            stream: 'stream-browserify',
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
};
