/* @license
 * Copyright 2021 Lowe's Companies, Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
	context: __dirname,
	entry: path.resolve(appDirectory, "lib/product-viewer.js"),
	output: {
		filename: "product-viewer.js",
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
		],
	},
	plugins: [new ForkTsCheckerWebpackPlugin()],
};
