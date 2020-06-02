import React, { useState } from "react";
import styled from "styled-components";
type TFeedBack = "hidden" | "visible";
export const Wording: React.FC<{
	feedback: TFeedBack;
	wording: string[];
}> = ({ wording, feedback }) => {
	return (
		<WordingWrapper>
			<p>
				{wording.map((letter, index) => (
					<Letter key={index}>{feedback === "visible" ? letter : "_"}</Letter>
				))}
			</p>
		</WordingWrapper>
	);
};

const WordingWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
const Letter = styled.span`
	color: #060606;
	font-size: 4rem;
	&:not(:last-of-type) {
		margin-right: 1.5rem;
	}
`;
