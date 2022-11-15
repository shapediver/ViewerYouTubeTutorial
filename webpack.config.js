const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
          terserOptions: {
            safari10: true
          }
        })],
      },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: {
                onlyCompileBundledFiles: true
            }
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};