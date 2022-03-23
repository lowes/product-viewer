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
import "@babylonjs/inspector";
import ProductViewerElementBase from "../product-viewer-base";
import { property } from "lit/decorators.js";
import { Constructor } from "../tools/Utils";

export declare interface InspectorInterface {
	inspector: boolean;
}

export const InspectorMixin = <T extends Constructor<ProductViewerElementBase>>(
	BaseViewerElement: T,
): Constructor<InspectorInterface> & T => {
	class InspectorViewerElement extends BaseViewerElement {
		@property({ type: Boolean, attribute: "inspector", reflect: true }) inspector = false;

		updated(changedProperties: Map<string, any>): void {
			super.updated?.(changedProperties);

			if (changedProperties.has("inspector")) {
				if (this.inspector) {
					this.showInspector();
				} else {
					this.hideInspector();
				}
			}
		}

		showInspector() {
			const globalRoot = (this.renderRoot as ShadowRoot).host.parentElement as HTMLElement;
			this.scene.debugLayer.show({ embedMode: true, globalRoot, overlay: false });
		}

		hideInspector() {
			if (this.scene?.debugLayer.isVisible()) {
				this.scene.debugLayer.hide();
			}
		}

		disconnectedCallback(): void {
			super.disconnectedCallback();
			// hide inspector on unmount so it will work when it is remounted
			this.hideInspector();
		}
	}

	return InspectorViewerElement as Constructor<InspectorInterface> & T;
};
