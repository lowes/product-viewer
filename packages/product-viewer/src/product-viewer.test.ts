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
