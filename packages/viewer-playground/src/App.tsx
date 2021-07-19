import React, { ReactElement, Suspense } from "react";
import "./styles/App.scss";
import VersionDisplay from "./components/VersionDisplay";
import LoadingOverlay from "./components/LoadingOverlay";
import Home from "./components/Home";

function App(): ReactElement {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Home />
			<VersionDisplay />
			<LoadingOverlay />
		</Suspense>
	);
}

export default App;
