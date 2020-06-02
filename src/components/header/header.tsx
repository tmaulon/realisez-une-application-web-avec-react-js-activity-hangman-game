import React from "react";
import styled from "styled-components";

export const Header = () => (
	<StyledHeader>
		<h1>Hangman Game</h1>
	</StyledHeader>
);
const StyledHeader = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: tomato;
	color: #fff;
`;
