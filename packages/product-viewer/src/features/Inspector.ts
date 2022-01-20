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
