import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import { Engine, Scene, Camera, AbstractMesh } from "@babylonjs/core";
import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export default class ProductViewerElementBase extends LitElement {
    viewerWrapper: HTMLDivElement;
    renderCanvas: HTMLCanvasElement;
    inspector: HTMLDivElement;
    engine: Engine;
    scene: Scene;
    camera: Camera;

    constructor() {
        super();
    }

    // Lit element styles that get applied to the template in the render() function
    static styles = css`
        .renderCanvas {
            width: 100%;
            height: 100%;
            touch-action: none;
            outline: none;
        }
        .viewerWrapper {
            width: 100%;
            height: 100%;
        }
    `;

    initBabylon() {
        this.viewerWrapper = this.shadowRoot.querySelector(".viewerWrapper");
        this.renderCanvas = this.shadowRoot.querySelector(".renderCanvas");

        // initialize babylon scene and engine
        this.engine = new Engine(this.renderCanvas, true, { preserveDrawingBuffer: true, stencil: true }, true);
        this.scene = new Scene(this.engine);

        // Update the pixel density to look sharp on high DPI screens (mobile devices)
        const scaleLevel = 1 / window.devicePixelRatio;
		this.engine.setHardwareScalingLevel(scaleLevel);

        // hide/show the Inspector
        this.renderCanvas.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === "KeyI") {
                if (this.scene.debugLayer.isVisible()) {
                    this.scene.debugLayer.hide();
                } else {
                    this.scene.debugLayer.show({ embedMode: true });
                }
            }
        });
        
        window.addEventListener("resize", (ev) => {
            this.engine.resize();
        });
        
        // run the main render loop
        this.engine.runRenderLoop(() => {
            if (this.camera) this.scene.render();
        });
    }

    modelLoaded(meshes: AbstractMesh[]): void {

    }

    // Fired on each property update. changedProperties includes the previous values
    updated(changedProperties: Map<string, any>) {
        super.updated?.(changedProperties);
    
        //if (changedProperties.has('viewerProps') && this.viewerProps != null) {
            this.updateRenderer();
        //}
    }
    
    render() {
        return html`
            <div class="viewerWrapper">
                <canvas class="renderCanvas" touch-action="none" />
            </div>
        `;
    }

    updateRenderer() {
        if (this.engine) this.engine.resize();
        else this.initBabylon();
    }
};