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
import { AbstractMesh, BoundingBox } from "@babylonjs/core";

export declare interface LayoutInterface {
}

export const LayoutMixin = <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T): Constructor<LayoutInterface> & T => {
    class LayoutModelViewerElement extends BaseViewerElement {

        modelLoaded(meshes: AbstractMesh[]) {
            super.modelLoaded(meshes);

            for (let mesh of meshes) {
                const bounds = mesh.getHierarchyBoundingVectors();
                const boundingBox = new BoundingBox(bounds.min, bounds.max);
                mesh.position.y = boundingBox.extendSizeWorld.y - boundingBox.centerWorld.y;
            }
        }
    }
    return LayoutModelViewerElement as Constructor<LayoutInterface> & T;
};