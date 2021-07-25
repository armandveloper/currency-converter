import * as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ICurrency } from '../interfaces/currency.interface';
import FormConverter from './FormConverter';

interface ConverterProps {
	background: string;
}

const useStyles = makeStyles({
	wrapper: {
		maxWidth: '460px',
		margin: '2em auto 0',
		padding: '1em',
	},
	converter: (props: ConverterProps) => ({
		backgroundColor: props.background,
		padding: '1em',
	}),
});

function Converter() {
	const theme = useTheme();
	const classes = useStyles({ background: theme.palette.background.paper });

	const API_USERNAME = process.env.REACT_APP_API_ID;
	const API_PASSWORD = process.env.REACT_APP_API_KEY;

	const [formattedCurrencies, setCurrencies] = React.useState<any[]>([]);

	const [isLoading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const getCountries = () => {
			return window
				.fetch('https://restcountries.eu/rest/v2/all')
				.then((res) => res.json());
		};

		const getCurrencies = () => {
			return window
				.fetch('https://xecdapi.xe.com/v1/currencies', {
					method: 'GET',
					headers: {
						Authorization: `Basic ${window.btoa(
							`${API_USERNAME}:${API_PASSWORD}`
						)}`,
					},
				})
				.then((res) => res.json());
		};

		const formatCurrencies = async () => {
			try {
				const [{ currencies }, countries] = await window.Promise.all([
					getCurrencies(),
					getCountries(),
				]);
				console.log(currencies);
				console.log(countries);

				const currenciesWithFlags: ICurrency[] = currencies.map(
					(currency: ICurrency) => {
						const flagFound: any = countries.find(
							(country: any) =>
								country.currencies[0].code === currency.iso
						);
						let formattedCurrency = null;
						if (currency.currency_name === 'US Dollar') {
							formattedCurrency = {
								...currency,
								flag: 'https://restcountries.eu/data/usa.svg',
							};
						} else if (!flagFound) {
							formattedCurrency = {
								...currency,
								flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/1200px-Blue_question_mark_icon.svg.png',
							};
						} else if (flagFound) {
							formattedCurrency = {
								...currency,
								flag: flagFound.flag,
							};
						}

						return formattedCurrency;
					}
				);
				return currenciesWithFlags;
			} catch (err) {
				console.log(err);
				return [];
			}
		};

		const init = async () => {
			const currencies = await formatCurrencies();

			setCurrencies(currencies);
			setLoading(false);
		};

		init();
	}, [API_USERNAME, API_PASSWORD]);

	return isLoading ? (
		<h1>Loadinfg....</h1>
	) : (
		<main className={classes.wrapper}>
			<div className={classes.converter}>
				<FormConverter currencies={formattedCurrencies} />
			</div>
		</main>
	);
}

export default Converter;
