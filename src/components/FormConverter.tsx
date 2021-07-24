import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import CachedIcon from '@material-ui/icons/Cached';
import { ICurrency } from './Converter';

interface FormConverterProps {
	currencies: any[];
}

interface ICurrencyPair {
	from: ICurrency;
	to: ICurrency;
}

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

function FormConverter({ currencies }: FormConverterProps) {
	const [currencyPair, setCurrencyPair] = React.useState<ICurrencyPair>({
		from: currencies[149],
		to: currencies[115],
	});

	const updatePair = (iso: string, type: 'from' | 'to') => {
		const currency: ICurrency = currencies.find(
			(currency: ICurrency) => currency.iso === iso
		);

		setCurrencyPair({
			...currencyPair,
			[type]: { ...currency },
		});
	};

	const classes = useStyles();
	return (
		<form>
			<FormControl className={classes.formControl} fullWidth={true}>
				<TextField label="Amount" id="amount" type="number" />
			</FormControl>
			<FormControl className={classes.formControl} fullWidth={true}>
				<InputLabel id="from-currency-label">From</InputLabel>
				<Select
					onChange={(e) =>
						updatePair(e.target.value as string, 'from')
					}
					labelId="from-currency-label"
					id="from-currency-select"
					value={currencyPair.from.iso}
				>
					{currencies.map((currency: any) => (
						<MenuItem
							key={currency.iso}
							className={classes.option}
							value={currency.iso}
						>
							<img
								loading="lazy"
								className={classes.optionFlag}
								width="24"
								height="24"
								src={currency.flag}
								alt={`${currency.currency_name} flag`}
							/>
							<span>{currency.currency_name}</span>
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<CachedIcon className={classes.convertIcon} color="primary" />
			<FormControl className={classes.formControl} fullWidth={true}>
				<InputLabel id="to-currency-label">To</InputLabel>
				<Select
					onChange={(e) => updatePair(e.target.value as string, 'to')}
					labelId="to-currency-label"
					id="to-currency-select"
					value={currencyPair.to.iso}
				>
					{currencies.map((currency: ICurrency) => (
						<MenuItem
							key={currency.iso}
							className={classes.option}
							value={currency.iso}
						>
							<img
								loading="lazy"
								className={classes.optionFlag}
								width="24"
								height="24"
								src={currency.flag}
								alt={`${currency.currency_name} flag`}
							/>
							<span>{currency.currency_name}</span>
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Button variant="contained" color="primary" fullWidth={true}>
				Convert
			</Button>
		</form>
	);
}

export default FormConverter;
