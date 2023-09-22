import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAccuracyQuery, useScoreQuery } from '../../hooks/queries';
import { useGuessWordMutation, useSkipWordMutation } from '../../hooks/mutations';
import GameTime from './GameTime';
import GameText from './GameText';

/*
TODO:
	*do the + or - time float indicator
	*new record indicator
	*left to right slide transitions
*/

/*
Holds the page for the game itself
*/
export default function GameCard({ endGame }) {
	const [guessedWord, setGuessedWord] = useState('');
	const [focus, setFocus] = useState(0);
	const queryClient = useQueryClient();
	const { accuracy, isAccuracyError, isAccuracyLoading } = useAccuracyQuery(queryClient);
	const { score, isScoreError, isScoreLoading } = useScoreQuery(queryClient);
	const guessWordMutation = useGuessWordMutation(queryClient, focusText);
	const skipWordMutation = useSkipWordMutation(queryClient, focusText);

	useEffect(() => {
		document.addEventListener('gameover', endGame);
		return () => document.removeEventListener('gameover', endGame);
	}, [])

	//just changing the focus state refocuses the first input
	function focusText() {
		setFocus((prevFocus) => prevFocus === 0 ? 1 : 0);
	}

	const isDisabled = guessWordMutation.isLoading || skipWordMutation.isLoading;


	return (
		<>
			<Card variant="outlined" className={`transition-all max-w-card min-w-card w-card`}>
				<CardHeader title={
					<Box className="flex justify-around">
						<Chip label={`Accuracy: ${Math.round(accuracy)}%`} />
						<Chip label={`Score: ${Math.round(score)}`} />
					</Box>
				}
				>
				</CardHeader>
				<CardContent className="flex flex-col items-center">
					<GameTime></GameTime>
					<GameText guessedWord={guessedWord}
						setGuessedWord={setGuessedWord}
						submitGuess={guessWordMutation.mutate}
						disabled={isDisabled}
						focus={focus}
					></GameText>
				</CardContent>
				<CardActions className="justify-between">
					<Button variant="outlined"
						onClick={() => skipWordMutation.mutate()}
						disabled={isDisabled}
					>
						Skip
					</Button>
					<Button variant="contained"
						onClick={() => guessWordMutation.mutate(guessedWord)}
						disabled={isDisabled}
					>
						Guess
					</Button>
				</CardActions>
			</Card>
		</>
	);
}