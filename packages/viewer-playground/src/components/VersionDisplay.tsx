import React, { ReactElement } from "react";
import styled from "styled-components/macro";
//import config from "../config/config";
import pjson from "../../package.json";

const VersionDiv = styled.div`
	position: absolute;
	background: #7d8492;
	border-radius: 57px;
	padding: 2px 4px;
	right: 3px;
	bottom: 6px;
	font-size: 10px;
`;

const VersionText = styled.span`
	color: #fff;
`;

function VersionDisplay(): ReactElement {
	const envName = process.env.REACT_APP_ENV === "production" ? "prod" : "dev";
	const build = process.env.REACT_APP_BUILD ?? "local";
	const version = `${pjson.version}-${envName}-${build.slice(0, 7)}`;

	return (
		<VersionDiv className="noselect">
			<VersionText>
				<span>v{version}</span>
			</VersionText>
		</VersionDiv>
	);
}

export default VersionDisplay;
