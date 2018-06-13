import { WalletClass } from 'Classes/Wallet';
const Wallet = new WalletClass();


export const setCryptoPrice = (price) => {
	let toSymbol = 'USD,EUR,BRL';
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

