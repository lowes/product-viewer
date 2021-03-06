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
import React, { ReactElement } from "react";
import "@lowes/product-viewer/lib/product-editor";
import SplitPane from "react-split-pane";
import HTMLSnippet from "../components/HTMLSnippet";
import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core";

const defaultSize = 500; // Set default viewer canvas height

function Editor(): ReactElement {
	const [panelSize, setPanelSize] = React.useState(defaultSize);
	const [showingInspector, setShowingInspector] = React.useState(true);
	const [displayWireframe, setDisplayWireframe] = React.useState(false);

	const handlePanelDrag = (newSize: number) => {
		setPanelSize(newSize);
	};

	return (
		<SplitPane
			split="horizontal"
			style={{ position: "relative" }}
			defaultSize={defaultSize}
			minSize={200}
			onChange={handlePanelDrag}
		>
			<product-editor
				style={{ height: panelSize, width: "100%" }}
				model-url="./common-assets/models/WaterBottle.glb"
				scale-ref-url="./common-assets/models/6ft_man.glb"
				inspector={showingInspector || undefined}
				wireframe={displayWireframe || undefined}
				create-ground
				create-skybox
			/>
			<div style={{ display: "flex", flexDirection: "column", paddingInline: 12 }}>
				<FormControl>
					<FormControlLabel
						label="Show Inspector"
						control={
							<Checkbox
								id="show-inspector"
								checked={showingInspector}
								onChange={(e) => setShowingInspector(e.target.checked)}
							/>
						}
					/>
				</FormControl>
				<FormControl>
					<FormControlLabel
						label="Display Wireframe"
						control={
							<Checkbox
								id="display-wireframe"
								checked={displayWireframe}
								onChange={(e) => setDisplayWireframe(e.target.checked)}
							/>
						}
					/>
				</FormControl>

				{/* eslint-disable prettier/prettier */}
				<HTMLSnippet>
					&lt;product-editor model-url=&quot;./common-assets/models/WaterBottle.glb&quot;
					scale-ref-url=&quot;./common-assets/models/6ft_man.glb&quot;{showingInspector ? " inspector " : " "}
					{displayWireframe ? " wireframe " : " "}
					create-ground create-skybox /&gt;
				</HTMLSnippet>
				{/* eslint-enable prettier/prettier */}
			</div>
		</SplitPane>
	);
}

export default Editor;
