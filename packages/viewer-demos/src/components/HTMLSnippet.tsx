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
import React, { ReactElement, useEffect } from "react";
import "@lowes/product-viewer";
import styled from "styled-components/macro";
import Prism from "prismjs";

const CodeSnip = styled.pre`
	code {
		white-space: pre-wrap;
	}
`;

interface SnippetProps {
	children: string | string[];
}

function HTMLSnippet(props: SnippetProps): ReactElement {
	const [snippet, setSnippet] = React.useState("");

	useEffect(() => {
		if (Array.isArray(props.children)) {
			setSnippet(props.children.join(""));
		} else {
			setSnippet(props.children);
		}
		Prism.highlightAll();
	});

	return (
		<CodeSnip>
			<code className="language-html">{snippet}</code>
		</CodeSnip>
	);
}

export default HTMLSnippet;
