import { LoadingOverlayStatus, LoadingOverlayActionTypes, SHOW_LOADING_OVERLAY } from "./loadingOverlayTypes";

const initialState: LoadingOverlayStatus = {
	visible: false,
	message: "",
};

export function loadingOverlayReducer(state = initialState, action: LoadingOverlayActionTypes): LoadingOverlayStatus {
	switch (action.type) {
		case SHOW_LOADING_OVERLAY:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}
