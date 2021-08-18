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
import { Route, Switch, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components/macro";
import Navigation from "./Navigation";
import SimpleViewer from "../pages/SimpleViewer";
import CustomEnv from "../pages/CustomEnv";
import AugmentedReality from "../pages/AugmentedReality";

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
				<Switch>
					<Route exact path="/">
						<Redirect to="/simple" />
					</Route>
					<Route path="/simple" component={SimpleViewer} />
					<Route path="/environment" component={CustomEnv} />
					<Route path="/ar" component={AugmentedReality} />
				</Switch>
			</Content>
		</RootDiv>
	);
}

export default Home;
