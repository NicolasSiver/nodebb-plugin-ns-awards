var path = require('path'),
    webpack = require('webpack');

var packageJson = require('./package.json');

function getDefinePlugin(environment, version) {
    var config = {
        DEBUG: JSON.stringify(JSON.parse(environment.DEBUG || 'true')),
        VERSION: JSON.stringify(version),
        BUILD: JSON.stringify(JSON.parse(environment.BUILD || Date.now() * 0.001))
    };

    if (environment.NODE_ENV === 'production') {
        config['process.env'] = {'NODE_ENV': JSON.stringify('production')};
    }

    return new webpack.DefinePlugin(config);
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    plugins: [
        getDefinePlugin(process.env, packageJson.version)
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../../public/js'),
        filename: 'acp.js',
        library: 'admin/plugins/awards',
        libraryTarget: 'amd'
    }
};