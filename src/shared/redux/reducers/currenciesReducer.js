import { store } from 'Redux/stores';
// ENABLE COINS
let initialState = {
	default: 'BRL',
	locale: 'en', // this used for numeral lib - pt-br, en ...
	currencies: {
		BRL: { USD: 0, EUR: 0 },
		USD: { BRL: 0, EUR: 0 },
		EUR: { USD: 0, BRL: 0 }
	},
	crypto: {
		BTC: { USD: 0, BRL: 0, EUR: 0 },
		ETH: { USD: 0, BRL: 0, EUR: 0 },
		LNS: { USD: 0, BRL: 0, EUR: 0 }
	},
	cryptoTx: {
		LNS: { high: 0, medium: 0, low: 0 },
		BTC: { high: 0, medium: 0, low: 0 },
		ETH: { high: 0, medium: 0, low: 0 },
		LTC: { high: 0, medium: 0, low: 0 },
		DASH: { high: 0, medium: 0, low: 0 }

	}
}
const currenciesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CURRENCIES_SET_PRICE_FULFILLED':
			return {
				...state,
				currencies: action.payload
			}

		case 'CRYTPO_SET_PRICE_FULFILLED':
			return {
				...state,
				crypto: action.payload
			}

		case 'CRYTPO_SET_TX_FULFILLED':
			return {
				...state,
				cryptoTx: action.payload
			}
	}

	return state;
}

export default currenciesReducer;
