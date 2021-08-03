/* @license
 * Copyright 2021 Lowe's Companies, Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
