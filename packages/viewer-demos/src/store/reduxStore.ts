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

import { createStore, applyMiddleware, combineReducers, AnyAction } from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { loadingOverlayReducer } from "./loadingOverlay/loadingOverlayReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const rootReducer = combineReducers({
	loadingOverlay: loadingOverlayReducer,
});

type DispatchFunctionType = ThunkDispatch<RootState, undefined, AnyAction>;

export type RootState = ReturnType<typeof rootReducer>;

export const reduxStore = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware<DispatchFunctionType, RootState>(thunkMiddleware)),
);
