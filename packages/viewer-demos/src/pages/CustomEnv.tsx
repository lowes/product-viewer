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
import "@lowes/product-viewer";
import { Checkbox, FormControlLabel, FormLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, { ReactElement } from "react";
import SplitPane from "react-split-pane";
import HTMLSnippet from "../components/HTMLSnippet";
import { ChromePicker } from "react-color";

const defaultSize = 500; // Set default viewer canvas height

function CustomEnv(): ReactElement {
	const envNames = ["neutral", "office"];

	const [panelSize, setPanelSize] = React.useState(defaultSize);
	const [loadedEnv, setLoadedEnv] = React.useState("neutral");
	const [showSkybox, setShowSkybox] = React.useState(true);
	const [showGround, setShowGround] = React.useState(true);
	const [backgroundColor, setBackgroundColor] = React.useState("#ffffff");

	const handlePanelDrag = (newSize: number) => {
		setPanelSize(newSize);
	};

	const exampleHtml =
		`<product-viewer model-url="./common-assets/models/WaterBottle.glb" ` +
		`environment="./common-assets/environments/${loadedEnv}.env" ` +
		`${showGround ? "create-ground " : ""}` +
		`${showSkybox ? "create-skybox " : ""}` +
		`background-color="${backgroundColor}" />`;

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
				create-ground={showGround || undefined}
				create-skybox={showSkybox || undefined}
				background-color={backgroundColor}
			/>
			<div style={{ display: "flex", flexDirection: "column", padding: 12, alignItems: "stretch", gap: 12 }}>
				<HTMLSnippet>{exampleHtml}</HTMLSnippet>

				<div style={{ display: "flex" }}>
					<FormControl>
						<FormControlLabel
							label="Show Skybox"
							control={
								<Checkbox
									id="show-skybox"
									checked={showSkybox}
									onChange={(e) => setShowSkybox(e.target.checked)}
								/>
							}
						/>
					</FormControl>
					<FormControl>
						<FormControlLabel
							label="Show Ground"
							control={
								<Checkbox
									id="show-ground"
									checked={showGround}
									onChange={(e) => setShowGround(e.target.checked)}
								/>
							}
						/>
					</FormControl>
				</div>

				<FormControl>
					<FormLabel>Environment Map</FormLabel>
					<Select
						id="model-select"
						value={loadedEnv}
						onChange={(event) => setLoadedEnv(event.target.value as string)}
					>
						{envNames.map((name) => (
							<MenuItem key={name} value={name}>
								{name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl>
					<FormLabel style={{ paddingBottom: 8 }}>Background Color</FormLabel>
					<ChromePicker color={backgroundColor} onChange={(color) => setBackgroundColor(color.hex)} />
				</FormControl>
			</div>
		</SplitPane>
	);
}

export default CustomEnv;
