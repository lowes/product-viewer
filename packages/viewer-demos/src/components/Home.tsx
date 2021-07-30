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
					<Route path="/environment" component={CustomEnv} />
					<Route path="/simple" component={SimpleViewer} />
				</Switch>
			</Content>
		</RootDiv>
	);
}

export default Home;
