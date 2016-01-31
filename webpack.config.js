var path = require('path');
module.exports = {
    entry: './src/dactyl.js',
    output: {
        path: __dirname,
        filename: './build/dactyl.js'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'src'),
              loader: 'babel-loader',
              exclude: '/node_modules/',
              query: {
                  presets: ['es2015']
              }
            }
        ]
    }
};
