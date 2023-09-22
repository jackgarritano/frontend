import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

/*
Renders a chip which displays a word that was guessed/skipped 
as well as number of guesses. Used in the end card marquee
*/
export default function WordChip({ word, status, guesses}) {
	return (
		<ul>
			<Chip
				avatar={<Avatar>{guesses}</Avatar>}
				label={word}
				color={status === 'guessed' ? 'success' : 'default'}
				sx={status !== 'guessed' ? 
					{ 
						bgcolor: (theme) => theme.palette.grey[500],
						color: (theme) => theme.palette.grey[50],
					} : 
					{}
				}
			>
			</Chip>
		</ul>
	)
}