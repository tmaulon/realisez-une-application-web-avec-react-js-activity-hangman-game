import React from "react";
import styled from "styled-components";
import {
	AlphabetLetterButton,
	AlphabetLetterButtonProps,
} from "../alphabet-letter-button/alphabet-letter-button";

interface AlphabetLetterBoardProps
	extends Pick<
		AlphabetLetterButtonProps,
		"onClick" | "lostGame" | "wonGame" | "lettersMatched"
	> {
	letters: string[];
}
export const AlphabetLetterBoard: React.FC<AlphabetLetterBoardProps> = ({
	letters,
	onClick,
	lostGame,
	wonGame,
	lettersMatched,
}) => {
	return (
		<LettersBoard>
			{letters.map((letter, index) => (
				<AlphabetLetterButton
					letter={letter}
					index={index}
					onClick={() => onClick(letter)}
					lostGame={lostGame}
					wonGame={wonGame}
					lettersMatched={lettersMatched}
				/>
			))}
		</LettersBoard>
	);
};
const LettersBoard = styled.div`
	display: grid;
	grid-auto-rows: 1fr;
	grid-template-columns: repeat(9, 1fr);
	grid-template-rows: repeat(3, 1fr);
	grid-gap: 1rem;
`;
