# 3d-viewer
This is a monorepo containing packages related to 3D product rendering and web based mixed reality.

### Getting Started
This project uses lerna to syncronize multiple sub projects. Once the "root" project is installed, it will manage cross-project dependencies, assets, and npm packages.

1. `npm install` 
2. `npm run bootstrap`
3. `npm run start`

The `start` command in the root directory will build the product-viewer, and then launch the viewer-playground react app in a dev hot-reload mode.

To run the product-viewer project by itself for faster development iteration:
1. `npm run bootstrap`
2. `cd packages/product-viewer`
3. `npm run start`

This will launch a dev server with a basic html page containing just a viewer component. 

NOTE: You need to run the root `bootstrap` script before launching the viewer by itself as it installs cross-dependencies and shared assets.

## Projects
### product-viewer
A 3D viewer custom web component powered by BabylonJS

### viewer-playground
A react web app demonstrating the features of product-viewer and sample implementations

### viewer-assets
Package containing shared assets for use across all product-viewer repos
