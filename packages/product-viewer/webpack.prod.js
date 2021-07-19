const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    optimization: {
        minimize: true,
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
});
