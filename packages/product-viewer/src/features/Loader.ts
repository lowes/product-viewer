import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
import { property } from "lit/decorators.js";
import { SceneLoader } from "@babylonjs/core";

export declare interface LoaderInterface {
    modelUrl: string;
    usdz: string;
}

export const LoaderMixin = <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T): Constructor<LoaderInterface> & T => {
    class LoaderModelViewerElement extends BaseViewerElement {
        @property({type: String, attribute: 'model-url'}) modelUrl: string;
        @property({type: String, attribute: 'usdz'}) usdz: string;

        updated(changedProperties: Map<string, any>): void {
            super.updated?.(changedProperties);
        
            this.updateLoader();
        }

        updateLoader(): void {
            SceneLoader.ImportMesh(
                "",
                this.modelUrl,
                "",
                this.scene,
                (meshes) => {
                    this.modelLoaded(meshes);
                },
                null,
                null,
                ".glb",
            );
        }
    }
    return LoaderModelViewerElement as Constructor<LoaderInterface> & T;
};