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
import "@babylonjs/loaders";
import { Engine, Scene, Camera, AbstractMesh, Tools, IScreenshotSize } from "@babylonjs/core";
import { LitElement, TemplateResult, CSSResultGroup } from "lit";
import { ResizeObserver as Polyfill, ResizeObserverEntry } from "@juggle/resize-observer";
import { style, template } from "./template";
//import { property } from "lit/decorators.js";

// Use native resize observer for better perf if available
const ResizeObserver = window.ResizeObserver || Polyfill;

export default class ProductViewerElementBase extends LitElement {
	viewerWrapper: HTMLDivElement;
	renderCanvas: HTMLCanvasElement;
	inspector: HTMLDivElement;
	engine: Engine;
	scene: Scene;
	camera: Camera;

	constructor() {
		super();
	}

	// Lit element styles that get applied to the template in the render() function
	static get styles(): CSSResultGroup {
		return [style];
	}

	initBabylon(): void {
		this.renderCanvas = this.shadowRoot.querySelector(".renderCanvas");
		this.viewerWrapper = this.shadowRoot.querySelector(".viewerWrapper");

		// initialize babylon scene and engine
		this.engine = new Engine(this.renderCanvas, true, { preserveDrawingBuffer: true, stencil: true }, true);
		this.scene = new Scene(this.engine);

		// Update the pixel density to look sharp on high DPI screens (mobile devices)
		const scaleLevel = 1 / window.devicePixelRatio;
		this.engine.setHardwareScalingLevel(scaleLevel);

		const resizeObserver = new ResizeObserver((entries: Array<ResizeObserverEntry>) => {
			// Set the new size of resized elements
			for (const entry of entries) {
				if (entry.target === this) {
					this.renderCanvas.height = entry.contentRect.height;
					this.renderCanvas.width = entry.contentRect.width;
					this.viewerWrapper.style.height = `${entry.contentRect.height}px`;
					this.viewerWrapper.style.width = `${entry.contentRect.width}px`;
				}
			}
			this.engine.resize();
			this.scene.render(); // Render the scene after resizing to prevent white flicker
		});
		resizeObserver.observe(this);

		// run the main render loop
		this.engine.runRenderLoop(() => {
			if (this.camera) this.scene.render();
		});
	}

	modelLoaded(meshes: AbstractMesh[]): void {
		console.log(`${meshes.length} mesh(es) loaded`);
	}

	// Fired on each property update. changedProperties includes the previous values
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updated(changedProperties: Map<string, any>): void {
		super.updated?.(changedProperties);

		//if (changedProperties.has('viewerProps') && this.viewerProps != null) {
		this.updateRenderer();
		//}
	}

	render(): TemplateResult {
		return template(this);
	}

	updateRenderer(): void {
		if (this.engine) this.engine.resize();
		else this.initBabylon();
	}

	takeScreenshot(size?: IScreenshotSize): Promise<string | null> {
		if (this.engine) {
			const { width, height } = this.renderCanvas;
			const screenshotSize = size ?? { width, height };
			return Tools.CreateScreenshotAsync(this.engine, null, screenshotSize);
		} else {
			console.warn("Unable to take screenshot because engine does not exist");
			return null;
		}
	}
}
