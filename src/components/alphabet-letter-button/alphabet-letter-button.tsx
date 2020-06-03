import React from "react";
import styled from "styled-components";

export interface AlphabetLetterButtonProps {
	letter: string;
	index: number;
	onClick: (letter: string) => void;
	lostGame: boolean;
	wonGame: boolean;
	lettersMatched: string[];
}
export const AlphabetLetterButton: React.FC<AlphabetLetterButtonProps> = ({
	letter,
	index,
	onClick,
	lostGame,
	wonGame,
	lettersMatched,
}) => {
	return (
		<Button
			key={index}
			onClick={() => onClick(letter)}
			disabled={lostGame || wonGame}
			matched={lettersMatched.includes(letter)}
			wonGame={wonGame}
		>
			{letter}
		</Button>
	);
};
const Button = styled.button<{ matched: boolean; wonGame: boolean }>`
	border: none;
	outline: none;
	box-shadow: none;
	background: none;
	padding: 10px;
	font-size: 1.2rem;
	background-color: ${({ matched }) => (matched ? "green" : "#fff")};
	border: ${({ matched }) =>
		matched ? "1px solid green" : "1px solid #0000ff"};
	color: ${({ matched }) => (matched ? "#fff" : "#0000ff")};
	transition: background-color.3s ease-out, border 0.3s ease-out,
		color 0.3s ease-out;
	&:hover,
	&:focus,
	&:focus-within {
		background-color: #0000ff;
		border: 1px solid #0000ff;
		color: #fff;
		cursor: pointer;
	}
	&:disabled {
		background-color: ${({ wonGame }) => (wonGame ? "" : "red")};
		border: ${({ wonGame }) => (wonGame ? "" : "1px solid red")};
		color: ${({ wonGame }) => (wonGame ? "" : "#fff")};
		cursor: not-allowed;
	}
`;
