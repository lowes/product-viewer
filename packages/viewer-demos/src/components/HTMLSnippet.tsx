import React, { ReactElement, useEffect } from "react";
import "@lowesinnovationlab/product-viewer";
import styled from "styled-components/macro";
import Prism from "prismjs";

const CodeSnip = styled.pre`
	code {
		white-space: pre-wrap;
	}
`;

interface SnippetProps {
	children: string;
}

function HTMLSnippet(props: SnippetProps): ReactElement {
	useEffect(() => {
		Prism.highlightAll();
	});

	return (
		<CodeSnip>
			<code className="language-html">{props.children}</code>
		</CodeSnip>
	);
}

export default HTMLSnippet;
