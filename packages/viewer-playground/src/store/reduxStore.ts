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
