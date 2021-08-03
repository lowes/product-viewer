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
