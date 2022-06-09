/* @license
 * Copyright 2022 Lowe's Companies, Inc. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
	context: __dirname,
	entry: {
		"product-viewer": path.resolve(appDirectory, "lib/product-viewer.js"),
		"product-editor": path.resolve(appDirectory, "lib/product-editor.js"),
	},
	output: {
		filename: "[name].js",
		path: path.resolve(appDirectory, "dist"),
		library: "productViewer",
		libraryTarget: "umd",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					transpileOnly: true,
				},
			},
			{
				test: /\.js$/,
				enforce: "pre",
				use: ["source-map-loader"],
			},
			{
				test: /\.(glb|usdz|gltf)/,
				type: "asset/resource",
				generator: {
					filename: "assets/[name][ext][query]",
				},
			},
			{
				test: /\.(png|dds|env)/,
				type: "asset/resource",
				generator: {
					filename: "static/[name][ext][query]",
				},
			},
		],
	},
	plugins: [new ForkTsCheckerWebpackPlugin()],
};
