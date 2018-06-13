import { WalletClass } from 'Classes/Wallet';

const Wallet = new WalletClass();

export const setCurrenciesPrice = (price) => {
	if (!price) {
		return {
			type: 'CURRENCIES_SET_PRICE',
			payload: Wallet.getCoinsPrice({
				USD:  { fromSymbol: 'USD', toSymbol:'BRL,EUR' },
				EUR:  { fromSymbol: 'EUR', toSymbol:'BRL,USD' },
				BRL:  { fromSymbol: 'BRL', toSymbol:'EUR,USD' }
			})
		};
	}
	return {
		type: 'CURRENCIES_SET_PRICE_FULFILLED',
		payload: price
	};
}

export const autoSetCurrenciesPrice = () => {

}
