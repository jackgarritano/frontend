import Box from '@mui/material/Box';
import StageController from './components/StageController';
import './App.css'
//import OtpInput from './components/OtpInput';
import OTPInput from './components/OtpInput';

import { useState } from 'react';
/*
Planned Dependencies:
	state management: zustand
	router: react-router
	styling: tailwind + material ui
	
*/

function App() {

	return (
		<Box className="flex flex-col items-center justify-center min-h-screen">
			<StageController></StageController>
			{/* <GameCard></GameCard> */}
			{/* <EndCard></EndCard> */}
			{/* <OTPInput
				value={otp}
				onChange={setOtp}
				placeholder={'a d '}
				numInputs={4}
				renderSeparator={''}
				renderInput={(props) => <input {...props} />}
			/> */}
		</Box>

	)
}

export default App
