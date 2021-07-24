import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles({
	formControl: {
		marginBottom: '2em',
	},
	option: {
		alignItems: 'center',
		display: 'flex',
	},
	optionFlag: {
		marginRight: '1em',
	},
	convertIcon: {
		display: 'block',
		fontSize: '5em',
		margin: '1rem auto',
	},
});

function FormConverter() {
	const classes = useStyles();
	return (
		<form>
			<FormControl className={classes.formControl} fullWidth={true}>
				<TextField label="Amount" id="amount" type="number" />
			</FormControl>
			<FormControl className={classes.formControl} fullWidth={true}>
				<InputLabel id="from-currency-label">From</InputLabel>
				<Select
					labelId="from-currency-label"
					id="from-currency-select"
					value={'USD'}
				>
					<MenuItem className={classes.option} value="USD">
						<img
							className={classes.optionFlag}
							width="24"
							height="24"
							src="https://restcountries.eu/data/usa.svg"
							alt="EUA flag"
						/>
						<span>USD</span>
					</MenuItem>
					<MenuItem className={classes.option} value="MXN">
						<img
							className={classes.optionFlag}
							width="24"
							height="24"
							src="https://restcountries.eu/data/usa.svg"
							alt="EUA flag"
						/>
						<span>MXN</span>
					</MenuItem>
					<MenuItem className={classes.option} value="EUR">
						<img
							className={classes.optionFlag}
							width="24"
							height="24"
							src="https://restcountries.eu/data/usa.svg"
							alt="EUA flag"
						/>
						<span>EUR</span>
					</MenuItem>
				</Select>
			</FormControl>
			<CachedIcon className={classes.convertIcon} color="primary" />
			<FormControl className={classes.formControl} fullWidth={true}>
				<InputLabel id="to-currency-label">To</InputLabel>
				<Select
					labelId="to-currency-label"
					id="to-currency-select"
					value={'USD'}
				>
					<MenuItem className={classes.option} value="MXN">
						<img
							className={classes.optionFlag}
							width="24"
							height="24"
							src="https://restcountries.eu/data/usa.svg"
							alt="EUA flag"
						/>
						<span>MXN</span>
					</MenuItem>
					<MenuItem className={classes.option} value="USD">
						<img
							className={classes.optionFlag}
							width="24"
							height="24"
							src="https://restcountries.eu/data/usa.svg"
							alt="EUA flag"
						/>
						<span>GBP</span>
					</MenuItem>
					<MenuItem className={classes.option} value="EUR">
						<img
							className={classes.optionFlag}
							width="24"
							height="24"
							src="https://restcountries.eu/data/usa.svg"
							alt="EUA flag"
						/>
						<span>EUR</span>
					</MenuItem>
				</Select>
			</FormControl>
			<Button variant="contained" color="primary" fullWidth={true}>
				Convert
			</Button>
		</form>
	);
}

export default FormConverter;
