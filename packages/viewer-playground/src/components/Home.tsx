import React, { ReactElement } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import ThreeDIcon from "@material-ui/icons/ThreeDRotation";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components/macro";
import SimpleViewer from "../pages/SimpleViewer";

const drawerWidth = 240;

const RootDiv = styled.div`
	display: flex;
`;

const NavDrawer = styled.nav`
	${(props) => props.theme.breakpoints.up("sm")} {
		flex-shrink: 0;
		width: ${drawerWidth}px;
	}
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

const DrawerPaper = styled(Drawer)`
	background-color: black;
	.MuiDrawer-paper {
		width: ${drawerWidth}px;
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

const Content = styled.main`
	flex-grow: 1;
`;

function Home(): ReactElement {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<SizedToolbar />
			<Divider />
			<List>
				<ListItem button key="Simple Viewer">
					<ListItemIcon>
						<ThreeDIcon />
					</ListItemIcon>
					<ListItemText primary="Simple Viewer" />
				</ListItem>
			</List>
		</div>
	);

	const container = window !== undefined ? () => window.document.body : undefined;

	return (
		<RootDiv>
			<CssBaseline />
			<StyledAppBar position="fixed">
				<Toolbar>
					<MenuButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
						<MenuIcon />
					</MenuButton>
					<Typography variant="h6" noWrap>
						Product Viewer Playground
					</Typography>
				</Toolbar>
			</StyledAppBar>
			<NavDrawer>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<DrawerPaper
						container={container}
						variant="temporary"
						anchor="left"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</DrawerPaper>
				</Hidden>
				<Hidden xsDown implementation="css">
					<DrawerPaper variant="permanent" open>
						{drawer}
					</DrawerPaper>
				</Hidden>
			</NavDrawer>
			<Content>
				<SizedToolbar />
				<SimpleViewer />
			</Content>
		</RootDiv>
	);
}

export default Home;
