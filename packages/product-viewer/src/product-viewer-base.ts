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

import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import { Engine, Scene, Camera, AbstractMesh } from "@babylonjs/core";
import { LitElement, html, css, TemplateResult } from "lit";
import { ResizeObserver as Polyfill } from "@juggle/resize-observer";
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
	static styles = css`
		:host {
			display: block;
			height: 100%;
			width: 100%;
		}
		.renderCanvas {
			width: 100%;
			height: 100%;
			touch-action: none;
			outline: none;
		}
	`;

	initBabylon(): void {
		this.renderCanvas = this.shadowRoot.querySelector(".renderCanvas");

		// initialize babylon scene and engine
		this.engine = new Engine(this.renderCanvas, true, { preserveDrawingBuffer: true, stencil: true }, true);
		this.scene = new Scene(this.engine);

		// Update the pixel density to look sharp on high DPI screens (mobile devices)
		const scaleLevel = 1 / window.devicePixelRatio;
		this.engine.setHardwareScalingLevel(scaleLevel);

		// hide/show the Inspector
		this.renderCanvas.addEventListener("keydown", (ev) => {
			// Shift+Ctrl+Alt+I
			if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === "KeyI") {
				if (this.scene.debugLayer.isVisible()) {
					this.scene.debugLayer.hide();
				} else {
					this.scene.debugLayer.show({ embedMode: true });
				}
			}
		});

		window.addEventListener("resize", () => {
			this.engine.resize();
		});

		const resizeObserver = new ResizeObserver(() => {
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
		console.log(`${meshes.length} meshe(s) loaded`);
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
		return html` <canvas class="renderCanvas" touch-action="none" /> `;
	}

	updateRenderer(): void {
		if (this.engine) this.engine.resize();
		else this.initBabylon();
	}
}
