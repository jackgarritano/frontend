import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { StyledEngineProvider, createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const rootElement = document.getElementById("root");
const theme = createTheme({
	components: {
	MuiPopover: {
		defaultProps: {
			container: rootElement,
		},
	},
	MuiPopper: {
		defaultProps: {
			container: rootElement,
		},
	},
	MuiDialog: {
		defaultProps: {
			container: rootElement,
		},
	},
	MuiModal: {
		defaultProps: {
			container: rootElement,
		},
	},
	},
  });

const queryClient = new QueryClient();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ThemeProvider>
	</StyledEngineProvider>
  </React.StrictMode>
)
