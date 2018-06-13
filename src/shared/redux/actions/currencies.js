import { WalletClass } from 'Classes/Wallet';

const Wallet = new WalletClass();

export const setCurrenciesPrice = () => {
	return {
		type: 'CURRENCIES_SET_PRICE',
		payload: Wallet.getCoinsPrice({
			USD:  { fromSymbol: 'USD', toSymbol:'BRL,EUR' },
			EUR:  { fromSymbol: 'EUR', toSymbol:'BRL,USD' },
			BRL:  { fromSymbol: 'BRL', toSymbol:'EUR,USD' }
		})
	};
}

export const setCryptoPrice = (price) => {
	let toSymbol = 'USD,EUR,BRL';
	return {
		type: 'CRYTPO_SET_PRICE',
		payload: Wallet.getCoinsPrice({
			BTC:  { fromSymbol:'BTC',  toSymbol },
			ETH:  { fromSymbol:'ETH',  toSymbol },
			LTC:  { fromSymbol:'LTC',  toSymbol },
			DASH: { fromSymbol:'DASH', toSymbol },
		})
	}
}

export const autoSetCurrenciesPrice = () => { }
