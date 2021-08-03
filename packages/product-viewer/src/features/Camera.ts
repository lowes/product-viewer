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

import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
import { property } from "lit/decorators.js";
import { Vector3, ArcRotateCamera, FramingBehavior, AbstractMesh, Color4 } from "@babylonjs/core";

export declare interface CameraInterface {
    alpha: Number;
    beta: Number;
}

export const CameraMixin = <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T): Constructor<CameraInterface> & T => {
    class CameraModelViewerElement extends BaseViewerElement {
        @property({type: Number, attribute: 'alpha'}) alpha: Number = 0;
        @property({type: Number, attribute: 'beta'}) beta: Number = 0;
        framingBehavior: FramingBehavior;

        updated(changedProperties: Map<string, any>) {
            super.updated?.(changedProperties);
        
            this.updateCamera();
        }

        updateCamera(): void {
            this.scene.clearColor = new Color4(1, 1, 1, 1);

            // Set initial camera angle
            this.camera = new ArcRotateCamera("MainCamera", 0, 1, 5, Vector3.Zero(), this.scene);
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
            this.framingBehavior.framingTime = 500;
            this.framingBehavior.autoCorrectCameraLimitsAndSensibility = true;
            this.framingBehavior.zoomStopsAnimation = true;
            this.framingBehavior.elevationReturnTime = -1; // disable returning to elevation
            ArcRotateCamera.ForceAttachControlToAlwaysPreventDefault = true;
            camera.attachControl(this.renderCanvas, true);

            this.scene.onBeforeRenderObservable.add(() => {
                const w = this.engine.getRenderWidth(), h = this.engine.getRenderHeight();
                camera.orthoLeft = 5*w/h;
                camera.orthoTop = 5;
                camera.orthoRight = -5*w/h;
                camera.orthoBottom = -5;
            });
        }

        modelLoaded(meshes: AbstractMesh[]) {
            super.modelLoaded(meshes);
            this.framingBehavior.zoomOnMeshesHierarchy(meshes, true);
        }
    }
    return CameraModelViewerElement as Constructor<CameraInterface> & T;
};