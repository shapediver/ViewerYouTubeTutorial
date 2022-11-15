const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    onlyCompileBundledFiles: true
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devServer: {
        open: true,
        static: path.resolve(__dirname, 'dist-dev'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};