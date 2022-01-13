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

import {
	AbstractMesh,
	Color3,
	CubeTexture,
	EnvironmentHelper,
	HemisphericLight,
	IEnvironmentHelperOptions,
	ImageProcessingConfiguration,
	Vector3,
} from "@babylonjs/core";
import { property } from "lit/decorators.js";
import ProductViewerElementBase from "../product-viewer-base";
import { Constructor, getBoundingBox } from "../tools/Utils";

export declare interface LightingInterface {
	lightIntensity: number;
	environment: string;
	createGround: boolean;
	createSkybox: boolean;
}

export const LightingMixin = <T extends Constructor<ProductViewerElementBase>>(
	BaseViewerElement: T,
): Constructor<LightingInterface> & T => {
	class LightingModelViewerElement extends BaseViewerElement {
		hemisphericLight: HemisphericLight;
		envHelper: EnvironmentHelper;
		@property({ type: Number, attribute: "light-intensity" }) lightIntensity = 2.0;
		@property({ type: String, attribute: "environment" }) environment = "";
		@property({ type: Boolean, attribute: "create-ground" }) createGround = false;
		@property({ type: Boolean, attribute: "create-skybox" }) createSkybox = true;

		updated(changedProperties: Map<string, any>): void {
			super.updated?.(changedProperties);
			this.updateLighting();
		}

		modelLoaded(meshes: AbstractMesh[]): void {
			super.modelLoaded?.(meshes);

			// Get the root node of the first mesh to calculate total bounds for correct floor placement
			// Since all glbs import with under __root__ node, it doesn't matter which mesh index we use
			if (this.envHelper.ground) {
				const boundingBox = getBoundingBox(meshes[0]);
				this.envHelper.ground.position.y -= boundingBox.extendSizeWorld.y - boundingBox.centerWorld.y;
			}
		}

		updateLighting(): void {
			// Lights
			if (!this.hemisphericLight)
				this.hemisphericLight = new HemisphericLight("HemisphericLight", new Vector3(0, 1, 0), this.scene);

			this.hemisphericLight.intensity = this.lightIntensity;

			const envOptions: Partial<IEnvironmentHelperOptions> = {
				createGround: this.createGround,
				groundColor: new Color3(1, 1, 1),
				createSkybox: this.createSkybox,
				skyboxColor: new Color3(1, 1, 1),
			};
			if (this.environment) {
				const hdrTexture = CubeTexture.CreateFromPrefilteredData(this.environment, this.scene);
				envOptions.environmentTexture = hdrTexture;

				// NOTE: due to a bug in Babylon.js, when a new environmentTexture is passed to
				// envHelper.updateOptions(), the old object is disposed, but not set to null.
				// https://github.com/BabylonJS/Babylon.js/blob/40f0ba2cc8a7acbd9dbdc81492a305fa781a41bc/src/Helpers/environmentHelper.ts#L406
				// This prevents the update from completing due to a check in _setupEnvironmentTexture():
				// https://github.com/BabylonJS/Babylon.js/blob/40f0ba2cc8a7acbd9dbdc81492a305fa781a41bc/src/Helpers/environmentHelper.ts#L450
				if (this.scene.environmentTexture) {
					this.scene.environmentTexture.dispose();
					this.scene.environmentTexture = null;
				}
			}

			// NOTE: We need to remove the old envHelper before creating a new one when the `model-url` is updated.
			// It seems like we should be able to use `this.envHelper.updateOptions(envOptions)`,
			// however this causes the skybox & ground to disappear (or turn completely white).
			if (this.envHelper) this.envHelper.dispose();

			this.envHelper = this.scene.createDefaultEnvironment(envOptions);

			// Enable tonemapping to prevent white blowout
			this.scene.imageProcessingConfiguration.toneMappingEnabled = true;
			this.scene.imageProcessingConfiguration.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_ACES;
		}
	}
	return LightingModelViewerElement as Constructor<LightingInterface> & T;
};
