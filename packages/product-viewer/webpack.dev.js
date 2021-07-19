const path = require("path");
const fs = require("fs");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const appDirectory = fs.realpathSync(process.cwd());
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    entry: path.resolve(appDirectory, "src/product-viewer.ts"),
    devtool: "inline-source-map",
    devServer: {
        publicPath: "/",
        contentBase: path.join(__dirname, 'dist'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "public" },
                { from: "common-assets/models/WaterBottle.glb", to: "assets" },
            ],
        }),
    ]
});