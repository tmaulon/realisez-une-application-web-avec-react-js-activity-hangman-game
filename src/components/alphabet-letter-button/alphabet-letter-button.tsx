import React, { useState } from "react";
import styled from "styled-components";

export const AlphabetLetterButton: React.FC<{
	alphabet: string[];
	letter: string;
	index: number;
	onClick: (index: number) => void;
}> = ({ alphabet, letter, index, onClick }) => {
	return <Button onClick={() => onClick(index)}>{letter}</Button>;
};
const Button = styled.button`
	border: none;
	outline: none;
	box-shadow: none;
	background: none;
	padding: 10px;
	font-size: 1.2rem;
	background-color: #fff;
	border: 1px solid #0000ff;
	color: #0000ff;
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
		background-color: #060606;
		border: 1px solid #060606;
		color: #fff;
		cursor: not-allowed;
	}
`;
