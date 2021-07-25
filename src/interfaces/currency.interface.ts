export interface ICurrency {
	currency_name: string;
	is_obsolete: boolean;
	iso: string;
	flag: string;
}

export interface ICurrencyPair {
	from: ICurrency;
	to: ICurrency;
}

export interface IRateResult {
	amount: string;
	from: string;
	result: string;
	to: string;
}
