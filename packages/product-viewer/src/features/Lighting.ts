import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
import { property } from "lit/decorators.js";
import { Vector3, HemisphericLight, CubeTexture, ImageProcessingConfiguration, Color3, IEnvironmentHelperOptions } from "@babylonjs/core";

export declare interface LightingInterface {
    lightIntensity: Number;
    environment: string;
    createGround: boolean;
    createSkybox: boolean;
}

export const LightingMixin = <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T): Constructor<LightingInterface> & T => {
    class LightingModelViewerElement extends BaseViewerElement {
        hemisphericLight: HemisphericLight;
        @property({type: Number, attribute: 'light-intensity'}) lightIntensity = 2.0;
        @property({type: String, attribute: 'environment'}) environment = "";
        @property({type: Boolean, attribute: 'create-ground'}) createGround = false;
        @property({type: Boolean, attribute: 'create-skybox'}) createSkybox = true;

        updated(changedProperties: Map<string, any>): void {
            super.updated?.(changedProperties);
        
            this.updateLighting();
        }

        updateLighting(): void {
            // Lights
            this.hemisphericLight = new HemisphericLight("HemisphericLight", new Vector3(0, 1, 0), this.scene);
            this.hemisphericLight.intensity = this.lightIntensity;

            
            const envOptions: Partial<IEnvironmentHelperOptions> = {
                createGround: this.createGround,
                groundColor: new Color3(1, 1, 1),
                createSkybox: this.createSkybox,
                skyboxColor: new Color3(1, 1, 1),
            }
            if (this.environment) {
                const hdrTexture = CubeTexture.CreateFromPrefilteredData(this.environment, this.scene);
                envOptions.environmentTexture = hdrTexture;
            }
            this.scene.createDefaultEnvironment(envOptions);

            // Enable tonemapping to prevent white blowout
            this.scene.imageProcessingConfiguration.toneMappingEnabled = true;
            this.scene.imageProcessingConfiguration.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_ACES;
        }
    }
    return LightingModelViewerElement as Constructor<LightingInterface> & T;
};