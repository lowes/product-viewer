# Product Viewer

The product viewer is a custom Web Component that can be included a webpage using a custom tag (e.g. `<product-viewer />`). At it’s core, the 3D viewer takes a .glb 3D model file as a parameter and will render it using Babylon.js configured with a custom lighting setup specialized for product rendering.

In this viewer, many additional features can be toggled and customized, such as lighting, cameras, annotations, product variations, augmented reality, and more. Annotations can include text, images, video, and can trigger animations and toggle product variations.

## Usage
1. To use the product-viewer package you will need to authenticate with GitHub as it is currently a private package. Your GitHub account will need to have access to the lowesinnovationlab organization's packages. More details on [GitHub docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).
```
npm login --scope=@lowesinnovationlab --registry=https://npm.pkg.github.com
```
3. Once you are authenticated, add `@lowesinnovationlab:registry=https://npm.pkg.github.com` to a new or existing .npmrc file in the same directory as your package.json.
4. Push the .npmrc file to your repository
5. Add product viewer as a dependency in your package.json
```json
"dependencies": {
  "@lowesinnovationlab/product-viewer": "0.0.2"
}
```
4. Run the install command 
```
npm install
```
5. Import the product-viewer and add it to the page
```javascript
import "@lowesinnovationlab/product-viewer";
```
```html
<product-viewer model-url="path/to/filename.glb" />
```
More examples and customization options can be found at the [viewer-demos](https://3dviewer.3dmanager.app/) site.

## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />

### `npm run prepare`

Symlinks the viewer-assets files into this project's directory under `./common-assets`<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />

The build is minified and the filenames include the hashes.
