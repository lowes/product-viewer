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
//import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export declare interface ARInterface {
	ar: boolean;
	arScaling: boolean;
	usdz: string | null;
	readonly canActivateAR: boolean;
}

export const ARMixin = <T extends Constructor<ProductViewerElementBase>>(
	BaseViewerElement: T,
): Constructor<ARInterface> & T => {
	class ARModelViewerElement extends BaseViewerElement {
		@property({ type: Boolean, attribute: "ar" }) ar = false;
		@property({ type: Boolean, attribute: "ar-allow-scaling" }) arScaling = false;
		@property({ type: String, attribute: "usdz" }) usdz: string | null = null;

		// Example of adding more html to the base component
		// render() {
		//   return html`${super.render?.()} <div>Test</div`;
		// }
	}
	return ARModelViewerElement as Constructor<ARInterface> & T;
};
