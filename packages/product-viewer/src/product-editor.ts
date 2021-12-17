/* @license
 * Copyright 2022 Lowe's Companies, Inc. All Rights Reserved.
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
import { ARMixin } from "./features/AR";
import { CameraMixin } from "./features/Camera";
import { InspectorMixin } from "./features/Inspector";
import { LayoutMixin } from "./features/Layout";
import { LightingMixin } from "./features/Lighting";
import { LoaderMixin } from "./features/Loader";
import { ScaleReferenceMixin } from "./features/ScaleReference";
import ProductViewerElementBase from "./product-viewer-base";

export const ProductEditorElement = InspectorMixin(
	ScaleReferenceMixin(LightingMixin(LoaderMixin(CameraMixin(LayoutMixin(ARMixin(ProductViewerElementBase)))))),
);

export type ProductEditorElement = InstanceType<typeof ProductEditorElement>;

customElements.define("product-editor", ProductEditorElement);

declare global {
	interface HTMLElementTagNameMap {
		"product-editor": ProductEditorElement;
	}
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			"product-editor": any;
		}
	}
}
