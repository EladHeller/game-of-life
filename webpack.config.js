const path = require('path');

module.exports = function() {
    return {
        mode: 'production',
        entry: './src/index.ts',
        resolve: {extensions: ['.ts', '.js']},
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(t|j)s$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.txt$/i,
                    use: [
                        {
                            loader: 'raw-loader',
                            options: {
                                esModule: false,
                            },
                        },
                    ],
                },
            ]
        },
        devServer: {
          static: {
            directory: path.join(__dirname, 'dist'),
          },
          compress: true,
          port: 8081,
        }
    };
}