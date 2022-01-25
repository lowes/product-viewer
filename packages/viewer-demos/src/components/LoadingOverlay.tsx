/* @license
 * Copyright 2022 Lowe's Companies, Inc. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
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
