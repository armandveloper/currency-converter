import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { IRateResult } from '../interfaces/currency.interface';

const useStyles = makeStyles({
	wrapper: {
		margin: '1rem auto',
	},
	text: {
		fontWeight: 400,
	},
});

function RateResult({ amount, from, result, to }: IRateResult) {
	const classes = useStyles();

	if (!amount) return null;

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.text} component="p" variant="h5">
				{amount} {from} =
			</Typography>
			<Typography component="p" variant="h4">
				{result} {to}
			</Typography>
		</div>
	);
}

export default RateResult;
