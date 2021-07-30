import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reduxStore";
import { LoadingOverlayStatus, LoadingOverlayActionTypes, SHOW_LOADING_OVERLAY } from "./loadingOverlayTypes";

// TypeScript infers that this function is returning SendMessageAction
export function showLoadingOverlay(visible: boolean, message = ""): LoadingOverlayActionTypes {
	const payload: LoadingOverlayStatus = { visible, message };
	return {
		type: SHOW_LOADING_OVERLAY,
		payload,
	};
}

// Just an example of a redux thunk async action
export const delayedShowLoadingOverlay =
	(visibleInMs: number, message: string): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		setTimeout(() => {
			dispatch(showLoadingOverlay(true, message));
		}, visibleInMs);
	};
