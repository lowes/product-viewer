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
