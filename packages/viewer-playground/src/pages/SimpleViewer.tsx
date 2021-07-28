/* eslint-disable react/jsx-no-comment-textnodes */
import React, { ReactElement } from "react";
import "@lowesinnovationlab/product-viewer";
import SplitPane from "react-split-pane";
import HTMLSnippet from "../components/HTMLSnippet";
import { useMediaQuery, useTheme } from "@material-ui/core";

function SimpleViewer(): ReactElement {
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));

	return (
		/* eslint-disable prettier/prettier */
		<SplitPane split={smallScreen ? "vertical" : "horizontal"} style={{ position: "relative" }} defaultSize={500}>
			<HTMLSnippet>
				&lt;product-viewer
				model-url=&quot;./common-assets/models/WaterBottle.glb&quot;
				environment=&quot;./common-assets/environments/neutral.env&quot;
				/&gt;
			</HTMLSnippet>
			<product-viewer
				model-url="./common-assets/models/WaterBottle.glb"
				environment="./common-assets/environments/neutral.env"
			/>
		</SplitPane>
		/* eslint-enable prettier/prettier */
	);
}

export default SimpleViewer;
