import { LUNES_USD_PRICE } from 'Config/constants';
let initialState = {
	default: 'BTC',
	price: {
		BTC: { USD: 10000, BRL: 30000, EUR: 8000 },
		ETH: { USD: 400,   BRL: 1200,  EUR: 380  },
		LNS: { USD: 2,     BRL: 6,     EUR: 1.8  }
	}
}
const cryptocurrenciesReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'CRYTPO_SET_PRICE_FULFILLED':
			return {
				...state,
				price: action.payload
			}
			break;
		case 'CRYPTO_SET_LUNES_PRICE':
			let USD = action.payload.USD;
			let LNS = {
				USD: LUNES_USD_PRICE,
				BRL: LUNES_USD_PRICE * USD.BRL,
				EUR: LUNES_USD_PRICE * USD.EUR
			}
			state = {
				...state,
				price: {
					...state.price,
					LNS: LNS
				}
			}
			break;
	}
	return state;
}

export default cryptocurrenciesReducer;