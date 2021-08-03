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

import ProductViewerElementBase from "./product-viewer-base";
import { ARMixin } from "./features/AR";
import { CameraMixin } from "./features/Camera";
import { LightingMixin } from "./features/Lighting";
import { LoaderMixin } from "./features/Loader";
import { LayoutMixin } from "./features/Layout";

// Load feature mixins - the order is significant, outer mixing load later
export const ProductViewerElement = LightingMixin(LoaderMixin(CameraMixin(LayoutMixin(ARMixin(ProductViewerElementBase)))));

export type ProductViewerElement = InstanceType<typeof ProductViewerElement>;

customElements.define("product-viewer", ProductViewerElement);

declare global {
    interface HTMLElementTagNameMap {
        'product-viewer': ProductViewerElement;
    }
    namespace JSX {
        interface IntrinsicElements {
            'product-viewer': any;
        }
    }
}
