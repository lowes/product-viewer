import React, { ReactElement } from "react";
import { RootState } from "../store/reduxStore";
import { showLoadingOverlay } from "../store/loadingOverlay/loadingOverlayActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoadingOverlayStatus } from "../store/loadingOverlay/loadingOverlayTypes";
import styled from "styled-components/macro";

const LoadingOverlayDiv = styled.div`
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	background-color: #88888888;
	z-index: 10000;
	max-width: none;
`;

const LoadingOverlayText = styled.div`
	color: white;
	position: absolute;
	left: 50%;
	margin-left: -200px;
	width: 400px;
	text-align: center;
	top: 50%;
	margin-top: 60px;
`;

const LoadingSkipButton = styled.div`
	color: #ffffff55;
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
`;

function LoadingOverlay(): ReactElement | null {
	const dispatch = useDispatch();
	const loadingReduxState = useSelector<RootState, LoadingOverlayStatus>((state: RootState) => state.loadingOverlay);

	const dismiss = () => {
		dispatch(showLoadingOverlay(false));
	};

	// Show nothing if were not visible
	if (loadingReduxState.visible !== true) return null;

	return (
		<LoadingOverlayDiv>
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<LoadingOverlayText>
				{loadingReduxState.message}
				<br />
				<Link to="/" style={{ color: "white" }} onClick={dismiss}>
					Go Home
				</Link>
			</LoadingOverlayText>
			{/* prettier-ignore */}
			<LoadingSkipButton onClick={dismiss}>
				X
			</LoadingSkipButton>
		</LoadingOverlayDiv>
	);
}

export default LoadingOverlay;
