/* @license
 * Copyright 2021 Lowe's Companies, Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
			return null;
		}
	}
}
