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
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const appDirectory = fs.realpathSync(process.cwd());
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
	mode: "development",
	entry: {
		"product-viewer": path.resolve(appDirectory, "src/product-viewer.ts"),
		"product-editor": path.resolve(appDirectory, "src/product-editor.ts"),
	},
	devtool: "inline-source-map",
	devServer: {
		static: "./",
		host: "0.0.0.0",
		port: 8080,
		devMiddleware: {
			publicPath: "/",
		},
	},
	watchOptions: {
		ignored: "**/node_modules",
		aggregateTimeout: 1000,
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: "public" },
				{ from: "common-assets/models/", to: "assets" },
				{ from: "common-assets/environments/", to: "assets" },
			],
		}),
	],
});
