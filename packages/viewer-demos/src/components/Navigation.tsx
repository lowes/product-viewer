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
import { useLocation } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import MuiDrawer, { DrawerProps } from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ThreeDRotation from "@material-ui/icons/ThreeDRotation";
import NavButton from "./NavButton";
import styled from "styled-components/macro";

interface DrawerWidthProps {
	drawerWidth: number;
}

const Drawer = (props: DrawerProps & DrawerWidthProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { drawerWidth, ...rest } = props;
	return <MuiDrawer {...rest}>{rest.children}</MuiDrawer>;
};

const Nav = (props: DrawerWidthProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { drawerWidth, ...rest } = props;
	return <nav {...rest}>{rest.children}</nav>;
};

const NavDrawer = styled(Nav)`
	${(props) => props.theme.breakpoints.up("sm")} {
		flex-shrink: 0;
		width: ${(props) => props.drawerWidth}px;
	}
`;

const DrawerPaper = styled(Drawer)`
	.MuiDrawer-paper {
		width: ${(props) => props.drawerWidth}px;
	}
`;

const SizedToolbar = styled.div`
	@media (min-width: 0px) and (orientation: landscape) {
		min-height: 48px;
	}
	${(props) => props.theme.breakpoints.up("sm")} {
		min-height: 64px;
	}
	min-height: 56px;
`;

interface NavProps {
	children?: JSX.Element[] | JSX.Element | string;
	mobileOpen: boolean;
	drawerWidth: number;
	onClose?: () => void;
}

function Navigation(props: NavProps): ReactElement {
	const location = useLocation();

	const nav = [
		{ name: "Simple Viewer", id: "simple", icon: <ThreeDRotation /> },
		{ name: "Custom Environment", id: "environment", icon: <ThreeDRotation /> },
		{ name: "Augmented Reality", id: "ar", icon: <ThreeDRotation /> },
	];

	const drawer = (
		<div>
			<SizedToolbar />
			<Divider />
			<List>
				{nav.map((item) => (
					<NavButton
						key={item.id}
						label={item.name}
						icon={item.icon}
						pageId={item.id}
						selected={location.pathname === `/${item.id}`}
					/>
				))}
			</List>
		</div>
	);

	const container = window !== undefined ? () => window.document.body : undefined;

	return (
		<NavDrawer drawerWidth={props.drawerWidth}>
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Hidden smUp implementation="css">
				<DrawerPaper
					container={container}
					variant="temporary"
					anchor="left"
					open={props.mobileOpen}
					drawerWidth={props.drawerWidth}
					onClose={props.onClose}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					{drawer}
				</DrawerPaper>
			</Hidden>
			<Hidden xsDown implementation="css">
				<DrawerPaper variant="permanent" open drawerWidth={props.drawerWidth}>
					{drawer}
				</DrawerPaper>
			</Hidden>
		</NavDrawer>
	);
}

export default Navigation;
