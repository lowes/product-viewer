# Changelog

This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

The following changes have been implemented but not released yet:

## [Unreleased]

-   Add new `WireframeMixin` that exposes `wireframe` attribute in `product-editor`, allowing consumers to toggle the wireframe view of scene without using the Inspector.
-   Add new `BackgroundColorMixin` that exposes `background-color` attribute in both `product-viewer` and `product-editor`.

### Bug Fixes

-   Update `create-skybox` attribute to default to `false` so it can be toggled via HTML attributes.
-   Upgrade packages to patch vulnerability relating to `node-forge`.

## [0.0.8] - 2022-01-25

-   Resolve issues with `lerna publish` via GitHub Actions.
-   Update to MIT license.
-   Export TypeScript types relating to `product-editor`.

## [0.0.7] - 2022-01-25 `product-editor`

-   Added new webpack output for the `product-editor` web component that will contain functionality for editing product metadata. Currently includes the Babylon.js Inspector and ability to display scale reference models.
