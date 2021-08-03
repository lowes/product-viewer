# Product Viewer
This is a monorepo containing projects related to 3D product rendering and web-based mixed reality. All of the projects can be found under the `packages/` directory, each have their own readme.

## Packages
- product-viewer: A web component used to view 3D product assets. Currently a private npm package on the GitHub registry.

- viewer-demos: A react web app demonstrating the features of product-viewer and sample implementations. It is hosted at [3dviewer.3dmanager.app](https://3dviewer.3dmanager.app/)

- viewer-assets: contains shared assets for use across all product-viewer projects

## Development
This project uses lerna to syncronize multiple sub projects. Once the "root" project is installed, it will manage cross-project dependencies, assets, and npm packages.

1. `npm install` 
2. `npm run bootstrap`
3. `npm run start`

The `start` command in the root directory will build the product-viewer, and then launch the viewer-demos react app in a dev hot-reload mode.

To run the product-viewer project by itself for faster development iteration:
1. `npm run bootstrap`
2. `cd packages/product-viewer`
3. `npm run start`

This will launch a dev server with a basic html page containing just a viewer component. 

NOTE: You need to run the root `bootstrap` script before launching the viewer by itself as it installs cross-dependencies and shared assets.

## Available Scripts

### `npm run bootstrap`

Performs the following in each project package: 
1. `npm install`
2. symlinks the lerna packages that are dependencies of each other
3. `npm run prepublish`
4. `npm run prepare`

### `npm run clean`

Removes the `node_modules` directory from all packages.

### `npm run build`

Builds the build script for each package, if present.

### `npm run publish-packages`

Publishes all packages which are marked as `public` in their `package.json`. During publish, package versions are incremented.

### `npm run start`

Bootstraps the projects, creates a dev build, and then starts the viewer-demo site dev server.

### `npm run serve-viewer`

Starts a dev server for testing the `<product-viewer>` component in isolation.

## Publishing
To publish the packages in the repository to github package repository, first make sure that you are authenticated to GitHub. We recommend using a GitHub personal access token (PAT) stored within your per-user .npmrc file. More details can be found on the [GitHub docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).

Once you are authenticated, run the command `npm run publish-packages` from the root directory and lerna will automatically rev the package versions if their diffs have changed, and release them to the package registry.
