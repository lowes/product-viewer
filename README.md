# product-viewer
This is a monorepo containing packages related to 3D product rendering and web based mixed reality.

## Installation
1. To use the product-viewer package you will need to authenticate with GitHub as it is currently a private package. More details on [GitHub docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).
2. Once you are authenticated, add `@lowesinnovationlab:registry=https://npm.pkg.github.com` to a new or existing .npmrc file in the same directory as your package.json.
3. Push the .npmrc file to your repository
4. Add product viewer as a dependency in your package.json
```
"dependencies": {
  "@lowesinnovationlab/product-viewer": "0.0.2"
}
```
4. Run the install command 
```
npm install
```
5. Import the product-viewer and add it to the page
```
import "@lowesinnovationlab/product-viewer";
```
```
<product-viewer model-url="path/to/filename.glb" />
```

## Projects
### product-viewer
A 3D viewer custom web component powered by BabylonJS

### viewer-playground
A react web app demonstrating the features of product-viewer and sample implementations

### viewer-assets
Package containing shared assets for use across all product-viewer repos

## Development
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
