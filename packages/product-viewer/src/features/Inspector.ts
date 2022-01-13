import "@babylonjs/inspector";
import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";

export declare interface InspectorInterface {
	inspector: boolean;
}

export const InspectorMixin = <T extends Constructor<ProductViewerElementBase>>(
	BaseViewerElement: T,
): Constructor<InspectorInterface> & T => {
	class InspectorViewerElement extends BaseViewerElement {
		initBabylon() {
			super.initBabylon();

			const globalRoot = (this.renderRoot as ShadowRoot).host.parentElement as HTMLElement;
			this.scene.debugLayer.show({ embedMode: true, globalRoot, overlay: false });
		}

		disconnectedCallback(): void {
			super.disconnectedCallback();

			// hide inspector on unmount so it will work when it is remounted
			if (this.scene?.debugLayer.isVisible()) {
				this.scene.debugLayer.hide();
			}
		}
	}

	return InspectorViewerElement as Constructor<InspectorInterface> & T;
};
