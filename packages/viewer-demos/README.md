# Viewer Demos

The viewer demos project is a collection of product-viewer examples showcasing each of it's features and sample code with documentation.

## Prerequisites

Install the project by running `npm i` in the project's root directory.

In VSCode install:

-   Prettier - Code formatter - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
-   vscode-styled-components - https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components
-   CSS-in-JS - https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js
-   ESLint - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run lint`

Runs eslint and prettier checks on the source files and prints out any styling inconsistencies.
`npm run lint:eslint` only runs the eslint checks.
`npm run lint:prettier` only runs the prettier checks.

### `npm run fix`

Uses eslint and prettier on the source files to fix any styling inconsistencies that it can.
`npm run fix:eslint` only runs the eslint fixes.
`npm run fix:prettier` only runs the prettier fixes.

### `npm run prepare`

Symlinks the viewer-assets files into this project's directory under `./common-assets`<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
