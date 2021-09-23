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
import { AbstractMesh, SceneLoader } from "@babylonjs/core";

export declare interface LoaderInterface {
	modelUrl: string;
}

export const LoaderMixin = <T extends Constructor<ProductViewerElementBase>>(
	BaseViewerElement: T,
): Constructor<LoaderInterface> & T => {
	class LoaderModelViewerElement extends BaseViewerElement {
		@property({ type: String, attribute: "model-url" }) modelUrl: string;
		loadedModels: AbstractMesh[];

		updated(changedProperties: Map<string, any>): void {
			super.updated?.(changedProperties);

			this.updateLoader();
		}

		updateLoader(): void {
			// Remove all existing models before loading a new one
			if (this.loadedModels) {
				for (const model of this.loadedModels) {
					model.dispose();
				}
				this.loadedModels = [];
			}

			SceneLoader.ImportMesh(
				"",
				this.modelUrl,
				"",
				this.scene,
				(meshes) => {
					this.loadedModels = meshes;
					this.modelLoaded(meshes);
				},
				null,
				null,
				".glb",
			);
		}
	}
	return LoaderModelViewerElement as Constructor<LoaderInterface> & T;
};
