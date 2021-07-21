import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
import { property } from "lit/decorators.js";
import { AbstractMesh, BoundingBox } from "@babylonjs/core";

export declare interface LayoutInterface {
}

export const LayoutMixin = <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T): Constructor<LayoutInterface> & T => {
    class LayoutModelViewerElement extends BaseViewerElement {

        modelLoaded(meshes: AbstractMesh[]) {
            super.modelLoaded(meshes);

            for (let mesh of meshes) {
                const bounds = mesh.getHierarchyBoundingVectors();
                const boundingBox = new BoundingBox(bounds.min, bounds.max);
                mesh.position.y = boundingBox.extendSizeWorld.y - boundingBox.centerWorld.y;
            }
        }
    }
    return LayoutModelViewerElement as Constructor<LayoutInterface> & T;
};