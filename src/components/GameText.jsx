import Typography from '@mui/material/Typography';
import OtpInput from './OtpInput';
import Box from '@mui/material/Box';

import { useState, useEffect } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import { useWordQuery, useHintQuery } from '../../hooks/queries';


/*
Displays the scrambled word and the text input used for guessing
*/
export default function GameText({ guessedWord, setGuessedWord, submitGuess, disabled, focus }) {
	const queryClient = useQueryClient();
	const { currentWord, isCurrentWordError, isCurrentWordLoading } = useWordQuery(queryClient);
	const { hint, isHintError, isHintLoading } = useHintQuery(queryClient);

	const [redShake, setRedShake] = useState(false);
	const [borderColor, setBorderColor] = useState('');
	const spanArr = dimUsedLetters();

	useEffect(() => {
		function incorrectGuess() {
			setRedShake(true);
			setTimeout(() => {
				setRedShake(false);
			}, 650);
			setGuessedWord(' '.repeat(currentWord.length));
		}

		function correctGuess() {
			setBorderColor('border-green-500 border-[1px] border-solid rounded-[4px]');
			setTimeout(() => {
				setBorderColor('');
			}, 650);
			setGuessedWord(' '.repeat(currentWord.length));
		}

		document.addEventListener('incorrectword', incorrectGuess);
		document.addEventListener('correctword', correctGuess);

		return () => {
			document.removeEventListener('incorrectword', incorrectGuess);
			document.removeEventListener('correctword', correctGuess);
		}
	}, [])

	useEffect(() => {
		setGuessedWord(' '.repeat(currentWord.length));
	}, [currentWord])

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			submitGuess(guessedWord);
		}
	}

	function dimUsedLetters() {
		const usedLettersArr = guessedWord.toLowerCase().split('');
		const spanArr = [];
		for (const letter of currentWord.toLowerCase()) {
			if (usedLettersArr.includes(letter)) {
				const letterIndex = usedLettersArr.indexOf(letter);
				usedLettersArr.splice(letterIndex, 1);
				spanArr.push(<span className="text-gray-400" key={Math.random()}>{letter}</span>)
			}
			else {
				spanArr.push(<span key={Math.random()}>{letter}</span>)
			}
		}
		return spanArr;
	}
	


	return (
		<>
			<Typography variant="h4" className="my-8">
				{spanArr}
			</Typography>
			<Box className='h-28'>
				<OtpInput
					value={guessedWord}
					onChange={setGuessedWord}
					placeholder={hint}
					numInputs={currentWord.length}
					renderSeparator={''}
					renderInput={(props) => <input {...props} 
												className={`border border-solid rounded-lg 
													${redShake ? 'border-red-500 shake' : 'border-gray-300'}`
												}
												disabled={disabled}	
											/>}
					checkForSubmit={handleKeyDown}
					focus={focus}
				/>

			</Box>
		</>
	)
}