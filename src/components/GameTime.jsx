import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTimeQuery } from '../../hooks/queries';

/*
Displays the time bar and seconds counter text
*/
export default function GameTime() {
	const queryClient = useQueryClient();
	const { time, isTimeError, isTimeLoading } = useTimeQuery(queryClient);
	const prevTime = useRef();
	const highestTime = useRef(time - Date.now());
	const [timeLeft, setTime] = useState(time - Date.now());
	const [barColor, setBarColor] = useState('primary.main');

	highestTime.current = Math.max(highestTime.current, time - Date.now());

	useEffect(() => {
		if (prevTime.current !== undefined) {
			if (time > prevTime.current) {
				setTimeout(() => {
					setBarColor('green');
				}, 300);
				setTimeout(() => {
					setBarColor('blue');
				}, 2000);
			} else if (time < prevTime.current) {
				setTimeout(() => {
					setBarColor('red');
				}, 300);
				setTimeout(() => {
					setBarColor('blue');
				}, 2000);
			}
		}
		prevTime.current = time;
	}, [time]);

	useEffect(() => {
		if (timeLeft > 0) {
			const timerID = setInterval(() => {
				setTime(Math.max(time - Date.now(), 0));
			}, 1000);
			return () => clearInterval(timerID);
		}
		else {
			dispatchGameOverEvent();
		}
	}, [timeLeft, time]);

	function normalizeTime(timeLeft) {
		const totalRange = highestTime.current / .9;
		return (timeLeft * 100) / totalRange;
	}

	function dispatchGameOverEvent() {
		const event = new CustomEvent('gameover');
		document.dispatchEvent(event);
	}

	return (
		<Box className="flex flex-row items-center justify-center w-full">
			<Box className="w-[80%]" sx={{ color: barColor, transition: 'color .3s ease-in-out' }}><LinearProgress
				variant="determinate"
				value={normalizeTime(timeLeft)}
				color='inherit'
			/></Box>
			<Box className="w-[15%] flex justify-center"><Typography className="justify-center">{Math.floor(timeLeft / 1000)}s</Typography></Box>
		</Box>
	);
}