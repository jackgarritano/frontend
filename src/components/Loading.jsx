import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function Loading({label}){

	return (
		<Box className="flex flex-col items-center space-y-2">
			<Typography className="text-lg font-medium text-gray-700">
				{label}
			</Typography>
      		<CircularProgress />
    	</Box>
	)
}