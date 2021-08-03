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
import { useHistory } from "react-router-dom";
import "@lowesinnovationlab/product-viewer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

interface NavButtonProps {
	label: string;
	icon: React.ReactElement;
	pageId: string;
	selected: boolean;
}

function NavButton(props: NavButtonProps): ReactElement {
	const history = useHistory();

	const handleClick = () => {
		history.push("/" + props.pageId);
	};

	return (
		<ListItem button key={props.label} onClick={handleClick} selected={props.selected}>
			<ListItemIcon>{props.icon}</ListItemIcon>
			<ListItemText primary={props.label} />
		</ListItem>
	);
}

export default NavButton;
