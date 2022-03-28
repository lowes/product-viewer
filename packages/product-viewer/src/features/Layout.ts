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
import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
import { property } from "lit/decorators.js";
import { AbstractMesh } from "@babylonjs/core";

export declare interface LayoutInterface {
	y: number;
	x: number;
	z: number;
}

export const LayoutMixin = <T extends Constructor<ProductViewerElementBase>>(
	BaseViewerElement: T,
): Constructor<LayoutInterface> & T => {
	class LayoutModelViewerElement extends BaseViewerElement {
		@property({ type: Number, attribute: "x" }) x = 0;
		@property({ type: Number, attribute: "y" }) y = 0;
		@property({ type: Number, attribute: "z" }) z = 0;

		modelLoaded(meshes: AbstractMesh[]) {
			super.modelLoaded(meshes);

			for (const mesh of meshes) {
				mesh.position.x += this.x;
				mesh.position.y += this.y;
				mesh.position.z += this.z;
			}
		}
	}
	return LayoutModelViewerElement as Constructor<LayoutInterface> & T;
};
