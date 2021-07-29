/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { ReactElement } from "react";
import "@lowesinnovationlab/product-viewer";
import styled from "styled-components/macro";

const CodeSnip = styled.pre`
	code {
		white-space: pre-wrap;
	}
`;

interface SnippetProps {
	children?: JSX.Element[] | JSX.Element | string;
}

function HTMLSnippet(props: SnippetProps): ReactElement {
	return (
        <CodeSnip>
            <code className="language-html">
                {props.children}
            </code>
        </CodeSnip>
	);
}

export default HTMLSnippet;
