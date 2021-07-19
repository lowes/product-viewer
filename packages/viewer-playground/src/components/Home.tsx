import React, { ReactElement } from "react";
//import { useDispatch } from "react-redux";
//import { delayedShowLoadingOverlay, showLoadingOverlay } from "../store/loadingOverlay/loadingOverlayActions";
import "@lowesinnovationlab/product-viewer";

function Home(): ReactElement {
	//const dispatch = useDispatch();

	// const handleShowLoading = () => {
	// 	dispatch(showLoadingOverlay(true, "Loading something!"));
	// };

	// const handleDelayedShowLoading = () => {
	// 	dispatch(delayedShowLoadingOverlay(1000, "Loading something!"));
	// };

	return (
		<div className="App">
			<product-viewer model-url="./common-assets/models/WaterBottle.glb" />
		</div>
	);
}

export default Home;
