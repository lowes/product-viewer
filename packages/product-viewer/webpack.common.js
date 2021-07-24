const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: path.resolve(appDirectory, "lib/product-viewer.js"),
    output: {
        filename: "product-viewer.js",
        path: path.resolve(appDirectory, "dist"),
        library: 'productViewer',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.(glb|usdz|gltf)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext][query]'
                }
            }
        ],
    },
    plugins: [new ForkTsCheckerWebpackPlugin()]
};