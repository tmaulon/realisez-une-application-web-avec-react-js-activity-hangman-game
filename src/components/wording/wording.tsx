import React from "react";
import styled from "styled-components";

export const Wording: React.FC<{
	word: string[];
	lettersMatched: string[];
}> = ({ word, lettersMatched }) => (
	<WordingWrapper>
		<p>
			{word.map((letter, index) => (
				<Letter key={index}>
					{lettersMatched.includes(letter) ? letter : "_"}
				</Letter>
			))}
		</p>
	</WordingWrapper>
);

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
