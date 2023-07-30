module.exports = {
    mode: 'development',
    entry: `./src/sample.jsx`,
    devtool: 'inline-source-map',
    output: {
        path: `${__dirname}/build`,
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules:
            [{
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }],
    },
};

