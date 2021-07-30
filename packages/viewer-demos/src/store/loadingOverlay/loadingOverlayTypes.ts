export interface LoadingOverlayStatus {
	visible: boolean;
	message: string;
	link?: string;
}

export const SHOW_LOADING_OVERLAY = "SHOW_LOADING_OVERLAY";

interface ShowLoadingOverlayAction {
	type: typeof SHOW_LOADING_OVERLAY;
	payload: LoadingOverlayStatus;
}

export type LoadingOverlayActionTypes = ShowLoadingOverlayAction;
