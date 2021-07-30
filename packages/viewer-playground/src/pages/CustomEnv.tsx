import React, { ReactElement } from "react";
import "@lowesinnovationlab/product-viewer";
import SplitPane from "react-split-pane";
import HTMLSnippet from "../components/HTMLSnippet";

const defaultSize = 500; // Set default viewer canvas height

function CustomEnv(): ReactElement {
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
			<product-viewer
				style={{ height: panelSize }}
				model-url="./common-assets/models/WaterBottle.glb"
				environment="./common-assets/environments/neutral.env"
				create-ground
			/>
			{/* eslint-disable prettier/prettier */}
			<HTMLSnippet>
				&lt;product-viewer
				model-url=&quot;./common-assets/models/WaterBottle.glb&quot;
				environment=&quot;./common-assets/environments/neutral.env&quot;
				create-ground
				/&gt;
			</HTMLSnippet>
			{/* eslint-enable prettier/prettier */}
		</SplitPane>
	);
}

export default CustomEnv;
