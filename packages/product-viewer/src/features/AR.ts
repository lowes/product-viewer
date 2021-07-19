import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
//import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

export declare interface ARInterface {
  ar: boolean;
  arScaling: boolean;
  usdz: string | null;
  readonly canActivateAR: boolean;
  activateAR(): Promise<void>;
}

export const ARMixin = <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T): Constructor<ARInterface> & T => {
    class ARModelViewerElement extends BaseViewerElement {
        @property({type: Boolean, attribute: 'ar'}) ar: boolean = false;
        @property({type: Boolean, attribute: 'ar-allow-scaling'}) arScaling: boolean = false;
        @property({type: String, attribute: 'usdz'}) usdz: string|null = null;
        // Example of adding more html to the base component
        // render() {
        //   return html`${super.render?.()} <div>Test</div`;
        // }

        async activateAR() {}
    }
    return ARModelViewerElement as Constructor<ARInterface> & T;
};
