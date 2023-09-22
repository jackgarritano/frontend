import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';

/*
Start screen displaying difficulty choice
*/
export default function StartCard({startGame}){
	const [difficulty, setDifficulty] = useState(null);
	const [open, setOpen] = useState(false);

	function changeDifficulty(e, newDifficulty){
		setDifficulty(newDifficulty);
	}

	function handleClose(event, reason){
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	}

	function startClicked(){
		if(difficulty === null){
			setOpen(true);
			return;
		}
		startGame(difficulty);
	}

	const action = (
		<>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);

	return (
		<>
		<Card variant="outlined" className="max-w-card min-w-card w-card">
			<CardHeader title="Word Scramble"></CardHeader>
			<CardContent className="flex justify-center items-center">
				<ToggleButtonGroup
					value={difficulty}
					exclusive
					onChange={changeDifficulty}
				>
					<ToggleButton value="easy" color="success">
						<Typography>Easy</Typography>
					</ToggleButton>
					<ToggleButton value="medium" color="warning">
						<Typography>Medium</Typography>
					</ToggleButton>
					<ToggleButton value="hard" color="error">
						<Typography>Hard</Typography>
					</ToggleButton>
				</ToggleButtonGroup>
			</CardContent>
			<CardActions className="justify-center">
				<Button variant="contained" onClick={startClicked}>
					Start
				</Button>
			</CardActions>
		</Card>
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
			<MuiAlert elevation={6} variant="filled"  severity="error" action={action}>
				Please select a difficulty
			</MuiAlert>
		</Snackbar>
	</>
	);
}