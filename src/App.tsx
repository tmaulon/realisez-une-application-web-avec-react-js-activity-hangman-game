import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "./components/header/header";
import shuffle from "lodash.shuffle";
import { Wording } from "./components/wording/wording";
import { AlphabetLetterBoard } from "./components/alphabet-letters-board/alphabet-letters-board";

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
		const newWord = generateWord()[0].split("");
		setWord(newWord);
	}, []);

	/**
	 *
	 * Logic
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

	const wonGame = lettersMatched.length === word.length;

	const lostGame = attempts === 6;

	return (
		<AppWrapper>
			<Header />
			<StyledSection>{checkGameState(attempts, score)}</StyledSection>
			{wonGame && (
				<StyledSection>
					<p>Gagné</p>
				</StyledSection>
			)}
			<StyledSection>
				<Wording lettersMatched={lettersMatched} word={word} />
			</StyledSection>
			<StyledSection>
				<AlphabetLetterBoard
					letters={ALPHABET}
					onClick={setLetterMatchedOrNot}
					lostGame={lostGame}
					wonGame={wonGame}
					lettersMatched={lettersMatched}
				/>
			</StyledSection>
			<StyledSection>
				<p>Lettres temptées : </p>
				<LettersAttemptList>
					{lettersAttempt.map((l, index) => (
						<p key={index}>{l}</p>
					))}
				</LettersAttemptList>
			</StyledSection>
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
	margin-top: 2rem;
`;
const LettersAttemptList = styled.div`
	display: grid;
	grid-auto-rows: 1fr;
	grid-template-columns: repeat(9, 1fr);
	grid-template-rows: repeat(3, 1fr);
	grid-gap: 1rem;
`;
