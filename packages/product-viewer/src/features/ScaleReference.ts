import { AbstractMesh, BoundingBox, SceneLoader } from "@babylonjs/core";
import { property } from "lit/decorators.js";
import ProductViewerElementBase from "../product-viewer-base";
import { Constructor, GetRootNode } from "../tools/Utils";

export declare interface ScaleReferenceInterface {
	scaleRefUrl?: string;
}

export const ScaleReferenceMixin = <T extends Constructor<ProductViewerElementBase>>(
	BaseViewerElement: T,
): Constructor<ScaleReferenceInterface> & T => {
	class ScaleReferenceViewerElement extends BaseViewerElement {
		@property({ type: String, attribute: "scale-ref-url", reflect: true }) scaleRefUrl?: string;

		boundingBox: BoundingBox;
		scaleReferenceModel: AbstractMesh;

		updated(changedProperties: Map<string, any>): void {
			super.updated?.(changedProperties);

			if (changedProperties.has("scaleRefUrl")) {
				this.updateScaleReference();
			}
		}

		modelLoaded(meshes: AbstractMesh[]): void {
			super.modelLoaded(meshes);

			// NOTE: this is the bounding box of the model loaded using the `model-url` attr
			// (not the scale reference).
			const bounds = GetRootNode(meshes[0]).getHierarchyBoundingVectors();
			this.boundingBox = new BoundingBox(bounds.min, bounds.max);

			this.updateScaleReferencePosition();
		}

		updateScaleReferencePosition(): void {
			if (this.scaleRefUrl && this.scaleReferenceModel && this.boundingBox) {
				const offset = this.boundingBox.centerWorld.subtract(this.boundingBox.extendSizeWorld);

				// 6ft_man is approx [0.3, 0.9, 0.2]
				this.scaleReferenceModel.position.x = 0.2 - offset.x;
				this.scaleReferenceModel.position.y = offset.y;
				this.scaleReferenceModel.position.z = offset.z - 0.3;
			}
		}

		updateScaleReference(): void {
			if (this.scaleRefUrl) {
				SceneLoader.ImportMesh(
					"",
					this.scaleRefUrl,
					"",
					this.scene,
					(meshes) => {
						this.scaleReferenceModel = meshes[0];
						this.updateScaleReferencePosition();
					},
					null,
					null,
					".glb",
				);
			} else {
				this.scaleReferenceModel?.dispose();
			}
		}
	}

	return ScaleReferenceViewerElement as Constructor<ScaleReferenceInterface> & T;
};
