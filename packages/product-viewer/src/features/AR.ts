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
import { Constructor, safeStringValue, isIOS, isAndroid } from "../tools/Utils";
import { property } from "lit/decorators.js";

export declare interface ARInterface {
	modelUrl: string;
	ar: boolean;
	arScaling: boolean;
	usdz: string | null;
}

export const ARMixin = <T extends Constructor<ProductViewerElementBase>>(
	BaseViewerElement: T,
): Constructor<ARInterface> & T => {
	class ARModelViewerElement extends BaseViewerElement {
		@property({ type: String, attribute: "model-url" }) modelUrl: string;
		@property({ type: Boolean, attribute: "ar" }) ar = false;
		@property({ type: Boolean, attribute: "ar-scaling" }) arScaling = false;
		@property({ type: String, attribute: "usdz" }) usdz: string | null = null;

		ARButtonElement: HTMLElement = this.shadowRoot?.querySelector(".ar-button");
		ARButtonClickEvent = (event: Event) => {
			event.preventDefault();
			this.launchAR();
		};

		updated(changedProperties: Map<string, any>): void {
			super.updated?.(changedProperties);
			this.ARButtonElement = this.shadowRoot?.querySelector(".ar-button");
			this.ARButtonElement.onclick = this.ARButtonClickEvent;

			if (!this.ar || (!isAndroid() && !isIOS()) || (isIOS() && !this.supportsIOSQuickLook())) {
				this.ARButtonElement.classList.remove("enabled");
			}
		}

		launchAR() {
			if (isIOS()) {
				this.openIOSARQuickLook();
			} else {
				this.openSceneViewer();
			}
		}

		openIOSARQuickLook() {
			const anchor = document.createElement("a");
			anchor.setAttribute("rel", "ar");
			anchor.appendChild(document.createElement("img"));

			const usdzUrl = this.usdz + "#allowsContentScaling=0";
			anchor.setAttribute("href", usdzUrl);
			anchor.click();
		}

		openSceneViewer(customIntent = "") {
			const anchor = document.createElement("a");
			const noArViewerSigil = "#model-viewer-no-ar-fallback";
			let fallbackInvoked = false;

			if (fallbackInvoked) {
				return;
			}

			const defaultIntent = this.createAndroidIntent();

			const testModelUrl = new URL(
				"https://AssetManager.azureedge.net/assets-v2/ed3d4508-dd22-4683-985b-1502694cde0c%5C132031998958633125.glb?7713ff81ffd1d4677ade591e212c38c29edd8a76f694360bd5f31ef82744b310cdb72cef2ff0677de17e7c87c56859b90203b4",
			);
			testModelUrl.protocol = "intent://";

			const intent = safeStringValue(customIntent, defaultIntent);

			const handleFallback = () => {
				if (self.location.hash === noArViewerSigil && !fallbackInvoked) {
					fallbackInvoked = true;
					// The new history will be the current URL with a new hash.
					// Go back one step so that we reset to the expected URL.
					// NOTE(cdata): this should not invoke any browser-level navigation
					// because hash-only changes modify the URL in-place without
					// navigating:
					self.history.back();
				}
			};

			self.addEventListener("hashchange", handleFallback, { once: true });

			anchor.setAttribute("href", intent);
			anchor.click();
		}

		createAndroidIntent() {
			// This is necessary because the original URL might have query
			// parameters. Since we're appending the whole URL as query parameter,
			// ? needs to be turned into & to not lose any of them.
			const gltfSrc = this.modelUrl.replace("?", "&");
			const location = self.location.toString();
			const locationUrl = new URL(location);
			const cleanUrl = new URL(gltfSrc, location);

			// modelUrl can contain title/link/sound etc.
			// These are already URL-encoded, so we shouldn't do that again here.
			let intentParams = `?file=${cleanUrl.toString()}&mode=ar_only`;

			if (!gltfSrc.includes("&link=")) {
				intentParams += `&link=${location}`;
			}
			// if (!gltfSrc.includes("&title=")) {
			// 	intentParams += `&title=${encodeURIComponent(this.alt || "")}`;
			// }
			intentParams += `&resizable=false`;

			const intent = `intent://arvr.google.com/scene-viewer/1.0${intentParams}#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
				locationUrl.toString(),
			)};end;`;

			return intent;
		}

		supportsIOSQuickLook() {
			const tempAnchor = document.createElement("a");

			return Boolean(
				tempAnchor.relList && tempAnchor.relList.supports && tempAnchor.relList.supports("ar") && this.usdz,
			);
		}
	}
	return ARModelViewerElement as Constructor<ARInterface> & T;
};
