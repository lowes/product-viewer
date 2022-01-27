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
import "@lowesinnovationlab/product-viewer";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, { ReactElement } from "react";
import SplitPane from "react-split-pane";
import HTMLSnippet from "../components/HTMLSnippet";

const defaultSize = 500; // Set default viewer canvas height

function CustomEnv(): ReactElement {
	const envNames = ["neutral", "office"];

	const [panelSize, setPanelSize] = React.useState(defaultSize);
	const [loadedEnv, setLoadedEnv] = React.useState("neutral");

	const handlePanelDrag = (newSize: number) => {
		setPanelSize(newSize);
	};

	const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
		setLoadedEnv(event.target.value as string);
	};

	return (
		<SplitPane
			split="horizontal"
			style={{ position: "relative" }}
			defaultSize={defaultSize}
			minSize={200}
			onChange={handlePanelDrag}
		>
			<product-viewer
				style={{ height: panelSize, width: "100%" }}
				model-url="./common-assets/models/WaterBottle.glb"
				environment={`./common-assets/environments/${loadedEnv}.env`}
				create-ground
			/>
			<FormControl fullWidth>
				<Select id="model-select" value={loadedEnv} onChange={handleChange}>
					{envNames.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
				{/* eslint-disable prettier/prettier */}
				<HTMLSnippet>
					&lt;product-viewer model-url=&quot;./common-assets/models/WaterBottle.glb&quot;
					environment=&quot;./common-assets/environments/{loadedEnv}.env&quot; create-ground /&gt;
				</HTMLSnippet>
				{/* eslint-enable prettier/prettier */}
			</FormControl>
		</SplitPane>
	);
}

export default CustomEnv;
