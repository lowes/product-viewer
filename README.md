# product-viewer
This is a monorepo containing packages related to 3D product rendering and web based mixed reality.

## Projects
### product-viewer
A 3D viewer custom web component powered by BabylonJS

### viewer-playground
A react web app demonstrating the features of product-viewer and sample implementations

### viewer-assets
Package containing shared assets for use across all product-viewer repos

## Getting Started
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

## Publishing
To publish the packages in the repository to github package repository, first make sure that you are authenticated to GitHub. We recommend using a GitHub personal access token (PAT) stored within your per-user .npmrc file. More details can be found on the [GitHub docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).

Once you are authenticated, run the command `npm run publish-packages` from the root directory and lerna will automatically rev the package versions if their diffs have changed, and release them to the package registry.
