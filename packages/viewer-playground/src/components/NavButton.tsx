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
