import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	createTheme,
	makeStyles,
	Theme,
	ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Converter from './components/Converter';

interface Props {
	background: string;
	foreground: string;
}

const useStyles = makeStyles({
	app: (props: Props) => ({
		backgroundColor: props.background,
		color: props.foreground,
		minHeight: '100vh',
		paddingTop: '1rem',
	}),
	title: {
		textAlign: 'center',
	},
});

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme: Theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode]
	);

	const classes = useStyles({
		background: theme.palette.background.default,
		foreground: theme.palette.text.primary,
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className={classes.app}>
				<Typography
					className={classes.title}
					variant="h4"
					component="h1"
					gutterBottom={true}
				>
					Currency Converter
				</Typography>
				<Converter />
			</div>
		</ThemeProvider>
	);
}

export default App;
