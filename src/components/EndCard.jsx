import Marquee from 'react-fast-marquee';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WordChip from './WordChip';

import { useQueryClient } from '@tanstack/react-query';
import { useAccuracyQuery, useScoreQuery, useHistoryQuery } from '../../hooks/queries';

/*
Displays stats and a scrolling marquee of guessed words
*/
export default function EndCard({reset}) {
	const queryClient = useQueryClient();
	const { accuracy, isAccuracyError, isAccuracyLoading } = useAccuracyQuery(queryClient);
	const { score, isScoreError, isScoreLoading } = useScoreQuery(queryClient);
	const { history, isHistoryError, isHistoryLoading } = useHistoryQuery(queryClient);

	return (
		<>
			<Card variant="outlined" className="max-w-card min-w-card w-card">
				<CardHeader title="Game Over"></CardHeader>
				<CardContent className="flex flex-col items-center justify-center">
					<Typography variant="h4" className="my-4">{`Score: ${score}`}</Typography>
					<Typography variant="h4" className="my-4">{`Accuracy: ${Math.round(accuracy)}%`}</Typography>
					<Marquee className="my-4">
						<li className='flex'>
							{history.map(item => {
								const word = Object.keys(item)[0];
								return <WordChip word={word}
									status={item[word].status}
									guesses={item[word].guesses}
									key={word}
								>
								</WordChip>
							})}
						</li>
					</Marquee>
				</CardContent>
				<CardActions className="justify-center">
					<Button variant="contained"
						onClick={reset}
					>
						Done
					</Button>
				</CardActions>
			</Card>
		</>
	);
}