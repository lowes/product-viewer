import ProductViewerElementBase from "./product-viewer-base";
import { ARMixin } from "./features/AR";
import { CameraMixin } from "./features/Camera";
import { LightingMixin } from "./features/Lighting";
import { LoaderMixin } from "./features/Loader";
import { LayoutMixin } from "./features/Layout";

// Load feature mixins - the order is significant, outer mixing load later
export const ProductViewerElement = LightingMixin(LoaderMixin(CameraMixin(LayoutMixin(ARMixin(ProductViewerElementBase)))));

export type ProductViewerElement = InstanceType<typeof ProductViewerElement>;

customElements.define("product-viewer", ProductViewerElement);

declare global {
    interface HTMLElementTagNameMap {
        'product-viewer': ProductViewerElement;
    }
    namespace JSX {
        interface IntrinsicElements {
            'product-viewer': any;
        }
    }
}
