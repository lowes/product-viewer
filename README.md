# Product Viewer

This is a monorepo containing projects related to 3D product rendering and web-based mixed reality. All of the projects can be found under the `packages/` directory, and each have their own readme.

## Packages

-   product-viewer: A web component used to view 3D product assets. Currently a private npm package on the GitHub registry.

-   viewer-demos: A react web app demonstrating the features of product-viewer and sample implementations. It is hosted at [3dviewer.3dmanager.app](https://3dviewer.3dmanager.app/)

-   viewer-assets: contains shared assets for use across all product-viewer projects

## Development

This project uses lerna to syncronize multiple sub projects. Once the "root" project is installed, it will manage cross-project dependencies, assets, and npm packages.

1. `npm run setup`
2. `npm run start`

The `start` command in the root directory will build the product-viewer, and then launch the viewer-demos react app in a dev hot-reload mode.

To run the product-viewer project by itself for faster development iteration:

1. `npm run setup`
2. `npm run serve-viewer`

This will launch a dev server with a basic html page containing just a viewer component.

NOTE: You need to run the root `setup` or `bootstrap` script before launching the viewer by itself as it installs cross-dependencies and shared assets.

## Recommended Software

NodeJS version: >=10.0.0

We recommend using VS Code for development, and opening the workspace file `.product-viewer.code-workspace` to improve subproject organization within the editor.

VS Code Plugins:

-   Prettier - Code formatter - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
-   vscode-styled-components - https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components
-   CSS-in-JS - https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js
-   ESLint - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
-   EditorConfig - https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig

## Available Scripts

| Command             | Description                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm run setup`     | Installs root dependencies and bootstraps the projects                                                  |
| `npm run bootstrap` | Runs `install`, `prepublish`, and `prepare` commands in each project, and symlinks sibling dependencies |
| `npm run start`     | Bootstraps the projects, creates a dev build, and then starts the viewer-demos dev server               |
| `npm run build`     | Runs the build script for each package, if present                                                      |
| `npm run clean`     | Removes `node_modules` directory from all packages                                                      |
| `npm run lint`      | Checks for lint issues in each package                                                                  |
| `npm run lint:fix`  | Fixes lint issues in each package                                                                       |
| `npm run test`      | Runs tests in each package                                                                              |

## Demo:
https://3dviewer.3dmanager.app/