import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { reduxStore } from "./store/reduxStore";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

//THEME
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/theme/Theme";

//CSS
import CssBaseline from "@material-ui/core/CssBaseline";
import "./styles/index.scss";
import "./styles/prism/prism.css";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={reduxStore}>
			<HashRouter>
				<CssBaseline />
				<MuiThemeProvider theme={Theme}>
					<ThemeProvider theme={Theme}>
						<App />
					</ThemeProvider>
				</MuiThemeProvider>
			</HashRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
