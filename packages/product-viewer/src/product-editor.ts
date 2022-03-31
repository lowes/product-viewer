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
import { ARMixin } from "./features/AR";
import { BackgroundColorMixin } from "./features/BackgroundColor";
import { CameraMixin } from "./features/Camera";
import { InspectorMixin } from "./features/Inspector";
import { LayoutMixin } from "./features/Layout";
import { LightingMixin } from "./features/Lighting";
import { LoaderMixin } from "./features/Loader";
import { ScaleReferenceMixin } from "./features/ScaleReference";
import { WireframeMixin } from "./features/Wireframe";
import ProductViewerElementBase from "./product-viewer-base";

// prettier-ignore
export const ProductEditorElement = 
	InspectorMixin(
	WireframeMixin(
	ScaleReferenceMixin(
	LightingMixin(
	LoaderMixin(
	BackgroundColorMixin(
	CameraMixin(
	LayoutMixin(
	ARMixin(
		ProductViewerElementBase
	)))))))));

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
