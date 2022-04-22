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
import { AbstractMesh, ArcRotateCamera, FramingBehavior, Vector2, Vector3 } from "@babylonjs/core";
import { property } from "lit/decorators.js";
import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";

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
		pivotPoint = Vector3.Zero();

		updated(changedProperties: Map<string, any>) {
			super.updated?.(changedProperties);

			if (!this.camera) this.createCamera();
		}

		createCamera(): void {
			// Set initial camera angle (defaults to targeting thie origin, but zooms to mesh once one loads)
			const camera = new ArcRotateCamera("MainCamera", Math.PI / 4, 1, 5, this.pivotPoint, this.scene);

			camera.zoomToMouseLocation = true;
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

			this.enableOrbitAroundModel(camera);

			this.camera = camera;
		}

		modelLoaded(meshes: AbstractMesh[]) {
			super.modelLoaded(meshes);
			this.camera.restoreState();
			this.isFraming = true;
			this.framingBehavior.zoomOnMeshesHierarchy(meshes, true, () => {
				this.pivotPoint.copyFrom((this.camera as ArcRotateCamera).target);
				this.isFraming = false;
			});
		}

		// This method ensures that the camera target remains locked to the pivotPoint (center of model),
		// even after the user moves the camera (by right click & drag, or by zooming into the mouse with wheel).
		// Heavily based on the example by Dave Solares: https://playground.babylonjs.com/#3B5W22#29
		enableOrbitAroundModel(camera: ArcRotateCamera) {
			this.scene.onBeforeRenderObservable.add(() => {
				const { alpha, beta } = camera;
				const { x, y, z } = Vector3.TransformCoordinates(this.pivotPoint, camera.getViewMatrix());
				camera.target.copyFrom(this.pivotPoint);
				camera.targetScreenOffset.set(x, y);
				camera.alpha = alpha;
				camera.beta = beta;
				camera.radius = z;
			});

			// The current behavior enabled by `camera.zoomToMouseLocation` assumes that
			// targetScreenOffset is set to (0, 0). Here we monkeypatch ArcRotateCameraMouseWheelInput._getPosition
			// with a wrapper to temporarily reset the offset back to the origin.
			// https://github.com/BabylonJS/Babylon.js/blob/master/packages/dev/core/src/Cameras/Inputs/arcRotateCameraMouseWheelInput.ts#L208
			const mouseWheelInput = camera.inputs.attached.mousewheel as any;
			if (mouseWheelInput) {
				const tmpOffset = Vector2.Zero();
				const _getPositionOriginal = mouseWheelInput._getPosition;
				mouseWheelInput._getPosition = () => {
					// save the current target offset to tmp variable
					tmpOffset.copyFrom(camera.targetScreenOffset);

					// move the camera target offset to zero & run the original function
					camera.targetScreenOffset.set(0, 0);
					const position: Vector3 = _getPositionOriginal.call(mouseWheelInput);

					// restore the target offset
					camera.targetScreenOffset.copyFrom(tmpOffset);

					return position;
				};
			}
		}
	}
	return CameraModelViewerElement as Constructor<CameraInterface> & T;
};
