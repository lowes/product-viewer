import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
import { property } from "lit/decorators.js";
import { Vector3, HemisphericLight, CubeTexture, ImageProcessingConfiguration, Color3 } from "@babylonjs/core";

export declare interface LightingInterface {
    lightIntensity: Number;
    environment: string;
}

export const LightingMixin = <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T): Constructor<LightingInterface> & T => {
    class LightingModelViewerElement extends BaseViewerElement {
        hemisphericLight: HemisphericLight;
        @property({type: Number, attribute: 'light-intensity'}) lightIntensity = 2.0;
        @property({type: String, attribute: 'environment'}) environment = "neutral";

        updated(changedProperties: Map<string, any>): void {
            super.updated?.(changedProperties);
        
            this.updateLighting();
        }

        updateLighting(): void {
            // Lights
            this.hemisphericLight = new HemisphericLight("HemisphericLight", new Vector3(0, 1, 0), this.scene);
            this.hemisphericLight.intensity = this.lightIntensity;

            if (this.environment === "neutral") {
                this.scene.createDefaultEnvironment({groundColor: new Color3(1, 1, 1), skyboxColor: new Color3(1, 1, 1) });
            } else {
                const hdrTexture = CubeTexture.CreateFromPrefilteredData(this.environment, this.scene);
		        this.scene.environmentTexture = hdrTexture;
            }

            // Enable tonemapping to prevent white blowout
            this.scene.imageProcessingConfiguration.toneMappingEnabled = true;
            this.scene.imageProcessingConfiguration.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_ACES;
        }
    }
    return LightingModelViewerElement as Constructor<LightingInterface> & T;
};