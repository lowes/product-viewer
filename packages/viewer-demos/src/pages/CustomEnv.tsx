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
