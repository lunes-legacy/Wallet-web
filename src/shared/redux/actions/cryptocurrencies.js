import { WalletClass } from 'Classes/Wallet';
const Wallet = new WalletClass();


export const setCryptoPrice = (price) => {
	let toSymbol = 'USD,EUR,BRL';

	if (!price) {
		return {
			type: 'CRYTPO_SET_PRICE',
			payload: Wallet.getCoinsPrice({
				BTC:  { fromSymbol:'BTC',  toSymbol },
				ETH:  { fromSymbol:'ETH',  toSymbol },
				DASH: { fromSymbol:'DASH', toSymbol },
				LTC:  { fromSymbol:'LTC',  toSymbol },
				NANO: { fromSymbol:'NANO', toSymbol },
			})
		}
	}
	return {
		type: 'CRYTPO_SET_PRICE_FULFILLED',
		payload: price
	}
}
export const setLunesPrice = (price) => {
	return {
		type: 'CRYPTO_SET_LUNES_PRICE',
		payload: price
	}
}
