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
import { Route, Routes, Navigate } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components/macro";
import Navigation from "./Navigation";
import SimpleViewer from "../pages/SimpleViewer";
import ModelLoading from "../pages/ModelLoading";
import CustomEnv from "../pages/CustomEnv";
import AugmentedReality from "../pages/AugmentedReality";
import Editor from "../pages/Editor";

const drawerWidth = 240;

const RootDiv = styled.div`
	display: flex;
`;

const StyledAppBar = styled(AppBar)`
	${(props) => props.theme.breakpoints.up("sm")} {
		width: ${`calc(100% - ${drawerWidth}px)`};
		margin-left: ${drawerWidth}px;
	}
`;

const MenuButton = styled(IconButton)`
	${(props) => props.theme.breakpoints.up("sm")} {
		display: none;
	}
	margin-right: ${(props) => props.theme.spacing(2)};
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

const Content = styled.main`
	flex-grow: 1;
`;

function Home(): ReactElement {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<RootDiv>
			<StyledAppBar position="fixed">
				<Toolbar>
					<MenuButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
						<MenuIcon />
					</MenuButton>
					<Typography variant="h6" noWrap>
						Product Viewer
					</Typography>
				</Toolbar>
			</StyledAppBar>
			<Navigation onClose={handleDrawerToggle} mobileOpen={mobileOpen} drawerWidth={drawerWidth} />
			<Content>
				<SizedToolbar />
				<Routes>
					<Route path="/simple" element={<SimpleViewer />} />
					<Route path="/loading" element={<ModelLoading />} />
					<Route path="/environment" element={<CustomEnv />} />
					<Route path="/ar" element={<AugmentedReality />} />
					<Route path="/editor" element={<Editor />} />
					<Route index element={<Navigate to="/simple" />} />
				</Routes>
			</Content>
		</RootDiv>
	);
}

export default Home;
