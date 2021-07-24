import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormConverter from './FormConverter';

interface ConverterProps {
	background: string;
}

const useStyles = makeStyles({
	converter: (props: ConverterProps) => ({
		backgroundColor: props.background,
		maxWidth: '460px',
		margin: '0 auto',
		padding: '1em',
	}),
});

function Converter() {
	const theme = useTheme();
	const classes = useStyles({ background: theme.palette.background.paper });
	return (
		<main className={classes.converter}>
			<FormConverter />
		</main>
	);
}

export default Converter;
