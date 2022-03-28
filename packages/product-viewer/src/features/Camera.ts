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
import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
import { property } from "lit/decorators.js";
import { Vector3, ArcRotateCamera, FramingBehavior, AbstractMesh, Color4 } from "@babylonjs/core";

export declare interface CameraInterface {
	alpha: number;
	beta: number;
	frameDuration: number;
	isFraming: boolean;
}

export const CameraMixin = <T extends Constructor<ProductViewerElementBase>>(
	BaseViewerElement: T,
): Constructor<CameraInterface> & T => {
	class CameraModelViewerElement extends BaseViewerElement {
		@property({ type: Number, attribute: "alpha" }) alpha = 0;
		@property({ type: Number, attribute: "beta" }) beta = 0;
		@property({ type: Number, attribute: "frame-duration" }) frameDuration = 500;
		isFraming = false;
		framingBehavior: FramingBehavior;

		updated(changedProperties: Map<string, any>) {
			super.updated?.(changedProperties);

			if (!this.camera) this.createCamera();
		}

		createCamera(): void {
			this.scene.clearColor = new Color4(1, 1, 1, 1);

			// Set initial camera angle
			this.camera = new ArcRotateCamera("MainCamera", Math.PI / 4, 1, 5, Vector3.Zero(), this.scene);
			const camera = this.camera as ArcRotateCamera;

			camera.wheelPrecision = 25;
			camera.pinchPrecision = 100;
			camera.panningDistanceLimit = 3;
			camera.angularSensibilityY = 900;
			camera.minZ = 0.1;
			camera.maxZ = 15000;
			camera.checkCollisions = true;
			camera.useFramingBehavior = true;
			this.framingBehavior = camera.getBehaviorByName("Framing") as FramingBehavior;
			this.framingBehavior.framingTime = this.frameDuration;
			this.framingBehavior.autoCorrectCameraLimitsAndSensibility = true;
			this.framingBehavior.zoomStopsAnimation = true;
			this.framingBehavior.elevationReturnTime = -1; // disable returning to elevation
			ArcRotateCamera.ForceAttachControlToAlwaysPreventDefault = true;
			camera.attachControl(this.renderCanvas, true);
			camera.storeState();

			this.scene.onBeforeRenderObservable.add(() => {
				const w = this.engine.getRenderWidth(),
					h = this.engine.getRenderHeight();
				camera.orthoLeft = (5 * w) / h;
				camera.orthoTop = 5;
				camera.orthoRight = (-5 * w) / h;
				camera.orthoBottom = -5;
			});
		}

		modelLoaded(meshes: AbstractMesh[]) {
			super.modelLoaded(meshes);
			this.camera.restoreState();
			this.isFraming = true;
			this.framingBehavior.zoomOnMeshesHierarchy(meshes, true, () => {
				this.isFraming = false;
			});
		}
	}
	return CameraModelViewerElement as Constructor<CameraInterface> & T;
};
