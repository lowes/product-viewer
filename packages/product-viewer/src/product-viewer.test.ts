/* @license
 * Copyright 2022 Lowe's Companies, Inc. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { assert, expect, fixture, html, waitUntil } from "@open-wc/testing";
import { ProductViewerElement } from "./product-viewer";

const LOADING_TIMEOUT = 5000;
const FRAMING_TIMEOUT = 1000;

describe("ProductViewerElement", () => {
	it("registers a custom element", () => {
		const viewer = document.createElement("product-viewer");
		assert.instanceOf(viewer, ProductViewerElement);
		expect(viewer.isLoading).to.be.false;
		expect(viewer.isFraming).to.be.false;
		expect(viewer.modelUrl).to.be.undefined;
		expect(viewer.createGround).to.be.false;
		expect(viewer.createSkybox).to.be.true;
	});

	it("is able to load a model", async () => {
		const modelPath = "./common-assets/models/Avocado.glb";
		const viewer = (await fixture(
			html`<product-viewer model-url="${modelPath}" create-ground></product-viewer>`,
		)) as ProductViewerElement;

		expect(viewer.modelUrl).to.equal(modelPath);
		expect(viewer.createGround).to.equal(true);

		const numInitialMeshes = viewer.scene.meshes.length;

		expect(viewer.isLoading).to.be.true;
		await waitUntil(() => !viewer.isLoading, "Viewer should finish loading", { timeout: LOADING_TIMEOUT });

		expect(viewer.isFraming).to.be.true;
		await waitUntil(() => !viewer.isFraming, "Viewer should finish framing", { timeout: FRAMING_TIMEOUT });

		// this particular model contains two meshes
		expect(viewer.scene.meshes.length).to.equal(numInitialMeshes + 2);
	});
});
