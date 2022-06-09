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

// we include these files to avoid relying on the Babylon.js CDN
import groundTexture from "../../static/backgroundGround.png";
import skyboxTexture from "../../static/backgroundSkybox.dds";
import environmentTexture from "../../static/environmentSpecular.env";

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
		@property({ type: Boolean, attribute: "create-skybox" }) createSkybox = false;

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
				environmentTexture,
				groundColor: new Color3(1, 1, 1),
				createSkybox: this.createSkybox,
				groundTexture,
				skyboxColor: new Color3(1, 1, 1),
				skyboxTexture,
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
