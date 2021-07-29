import React, { ReactElement } from "react";
import Divider from "@material-ui/core/Divider";
import MuiDrawer, { DrawerProps } from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ThreeDIcon from "@material-ui/icons/ThreeDRotation";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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
