/* @license
 * Copyright 2022 Lowe's Companies, Inc. All Rights Reserved.
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

import React, { ReactElement } from "react";
import "@lowesinnovationlab/product-viewer/lib/product-editor";
import SplitPane from "react-split-pane";
import HTMLSnippet from "../components/HTMLSnippet";

const defaultSize = 500; // Set default viewer canvas height

function Editor(): ReactElement {
	const [panelSize, setPanelSize] = React.useState(defaultSize);

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
				inspector
				create-ground
			/>
			{/* eslint-disable prettier/prettier */}
			<HTMLSnippet>
				&lt;product-editor model-url=&quot;./common-assets/models/WaterBottle.glb&quot;
				scale-ref-url=&quot;./common-assets/models/6ft_man.glb&quot; inspector create-ground /&gt;
			</HTMLSnippet>
			{/* eslint-enable prettier/prettier */}
		</SplitPane>
	);
}

export default Editor;