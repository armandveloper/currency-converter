import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
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
	swapBtn: {
		display: 'block',
		margin: '1rem auto',
	},
	swapIcon: {
		fontSize: '4.2em',
	},
});

const initCurrenciesState = (
	currencies: ICurrency[],
	from: string,
	to: string
): ICurrencyPair => {
	return {
		from:
			currencies.find((currency: ICurrency) => currency.iso === from) ||
			({} as ICurrency),
		to:
			currencies.find((currency: ICurrency) => currency.iso === to) ||
			({} as ICurrency),
	};
};

function FormConverter({ currencies }: FormConverterProps) {
	const [currencyPair, setCurrencyPair] = React.useState<ICurrencyPair>(
		initCurrenciesState(currencies, 'USD', 'MXN')
	);

	const swapCurrencies = () =>
		setCurrencyPair({
			from: {
				...currencyPair.to,
			},
			to: {
				...currencyPair.from,
			},
		});

	const updatePair = (iso: string, type: 'from' | 'to') => {
		const currency: ICurrency = currencies.find(
			(currency: ICurrency) => currency.iso === iso
		);

		// Si elige la misma moneda del select opuesto se hace un intercambio
		if (
			(type === 'from' && currency.iso === currencyPair.to.iso) ||
			(type === 'to' && currency.iso === currencyPair.from.iso)
		) {
			swapCurrencies();
			return;
		}

		setCurrencyPair({
			...currencyPair,
			[type]: { ...currency },
		});
	};

	const [amount, setAmount] = React.useState(1);

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(+e.target.value);
	};

	const [error, setError] = React.useState('');

	const handleConvert = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (amount < 1) {
			setError('The minimum amount value is 1');
			return;
		}
		setError('');
	};

	const classes = useStyles();
	return (
		<form onSubmit={handleConvert} noValidate={true} autoComplete="off">
			<FormControl className={classes.formControl} fullWidth={true}>
				<TextField
					error={!!error}
					helperText={error}
					id="amount"
					label="Amount"
					onChange={handleAmountChange}
					type="number"
					value={amount + ''}
				/>
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
			<IconButton
				className={classes.swapBtn}
				color="secondary"
				aria-label="Swap currencies"
				onClick={swapCurrencies}
			>
				<CachedIcon className={classes.swapIcon} />
			</IconButton>
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
			<Button
				type="submit"
				variant="contained"
				color="primary"
				fullWidth={true}
			>
				Convert
			</Button>
		</form>
	);
}

export default FormConverter;
