import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "./components/header/header";
import shuffle from "lodash.shuffle";

const WORDS = ["test", "ok"];
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const App = () => {
	const [word, setWord] = useState<string[]>([]);
	const [lettersMatched, setLettersMatched] = useState<string[]>([]);
	const [lettersAttempt, setLettersAttempt] = useState<string[]>([]);
	const [attempts, setAttempts] = useState<number>(0);
	const [score, setScore] = useState<number>(0);

	/**
	 * init game
	 */
	const generateWord = () => shuffle(WORDS);
	const initializeGame = () => {
		setLettersAttempt([]);
		setLettersMatched([]);
		setAttempts(0);
		const newWord = generateWord()[0].split("");
		setWord(newWord);
	};

	useEffect(() => {
		initializeGame();
	}, []);

	/**
	 *
	 * Logic
	 * @param selectedLetter
	 */
	const checkGameState = (attempts: number, score: number) =>
		attempts < 6 ? (
			<div>
				<p>Nombre d'essais effectués : {attempts}</p>
				<p>Nombre d'essais restants : {6 - attempts}</p>
				<p>Score : {score}</p>
			</div>
		) : (
			<div>
				<p>Vous avez atteint le nombre d'essais maximum : {attempts}</p>
				<p>Vous avez perdu</p>
				<p>Score : {score}</p>
				<p>Le mot était {word}</p>
			</div>
		);

	const setLetterMatchedOrNot = (selectedLetter: string) => {
		if (!selectedLetter) return;
		console.log(
			"setLetterMatchedOrNot : ",
			word,
			selectedLetter,
			word.includes(selectedLetter),
			word.findIndex((l) => l === selectedLetter),
			lettersAttempt,
			lettersMatched
		);
		if (!word.includes(selectedLetter)) {
			if (!lettersAttempt.includes(selectedLetter)) {
				setLettersAttempt([...lettersAttempt, selectedLetter]);
				setAttempts(attempts + 1);
				setScore(score - 1);
			} else {
				setAttempts(attempts + 1);
				setScore(score - 2);
			}
		} else {
			if (!lettersMatched.includes(selectedLetter)) {
				const matches = word.filter((l) => l === selectedLetter);
				setLettersMatched([...lettersMatched, ...matches]);
				setScore(score + 2);
			} else {
				setScore(score);
			}
		}
	};

	const won = lettersMatched.length === word.length;

	const loose = attempts === 6;

	const setSymbol = (letter: string, lettersMatched: string[]) => {
		return lettersMatched.includes(letter) ? letter : "_";
	};

	return (
		<AppWrapper>
			<Header />
			<StyledSection>{checkGameState(attempts, score)}</StyledSection>
			{won && (
				<StyledSection>
					<p>Gagné</p>
				</StyledSection>
			)}
			<StyledSection>
				<WordingWrapper>
					<p>
						{word.map((letter, index) => (
							<Letter key={index}>{setSymbol(letter, lettersMatched)}</Letter>
						))}
					</p>
				</WordingWrapper>
			</StyledSection>
			<StyledSection>
				<div>
					{ALPHABET.map((letter, index) => (
						<Button
							key={index}
							onClick={() => setLetterMatchedOrNot(letter)}
							disabled={loose || won}
							matched={lettersMatched.includes(letter)}
							won={won}
						>
							{letter}
						</Button>
					))}
				</div>
			</StyledSection>
			<section>
				<p>Lettres temptées : </p>
				<div>
					{lettersAttempt.map((l, index) => (
						<p key={index}>{l}</p>
					))}
				</div>
			</section>
			<StyledSection>
				<button onClick={() => initializeGame()}>Start new game</button>
			</StyledSection>
		</AppWrapper>
	);
};

export default App;

const AppWrapper = styled.div`
	height: 100vh;
	width: 100%;
	max-width: 100vw;
	font-family: "Montserrat", Arial, Helvetica, sans-serif;
`;
const StyledSection = styled.section`
	margin-top: 5rem;
`;
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
const Button = styled.button<{ matched: boolean; won: boolean }>`
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
		background-color: ${({ won }) => (won ? "" : "red")};
		border: ${({ won }) => (won ? "" : "1px solid red")};
		color: ${({ won }) => (won ? "" : "#fff")};
		cursor: not-allowed;
	}
`;
