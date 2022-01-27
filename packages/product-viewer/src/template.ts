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
import { html, css, TemplateResult } from "lit";
import ProductViewerElementBase from "./product-viewer-base";

export const style = css`
	:host {
		display: block;
		position: relative:;
		contain: strict;
		height: 200px;
		width: 350px;
	}
	.viewerWrapper {
		position: relative;
	}
	.container {
		position: absolute;
		pointer-events: none;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.renderCanvas {
		position: absolute;
		display: block;
		width: 100%;
		touch-action: none;
		outline: none;
	}
	.ar-button {
		position: absolute;
		right: 0;
		top: 0;
		:button {
			bottom: 16px;
			right: 16px;
		}
	}
	.container > * {
		pointer-events: initial;
	}
	.container.ar-button {
		-moz-user-select: none;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		display: var(--ar-button-display, block);
	}
	.container.ar-button:not(.enabled) {
		display: none;
	}
	#default-ar-button {
		position: absolute;
		bottom: 16px;
		right: 16px;
		transform: scale(var(--ar-button-scale, 1));
		transform-origin: bottom right;
	}
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const template = function (scope: ProductViewerElementBase): TemplateResult {
	return html`<div class="viewerWrapper">
		<div class="container">
			<canvas class="renderCanvas" touch-action="none"></canvas>
		</div>
		<div class="container ar-button enabled" name="ar-button">
			<slot name="ar-button">
				<button id="default-ar-button" class="fab">Launch AR</button>
			</slot>
		</div>
	</div>`;
};
