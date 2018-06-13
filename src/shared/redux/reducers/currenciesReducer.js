import { store } from 'Redux/stores';
let initialState = {
	default: 'BRL',
	price: {
		BRL: { USD: 0.3, EUR: 0.2 },
		USD: { BRL: 3, EUR: 1.2 },
		EUR: { USD: 0.8, BRL: 4 }
	},
	locale: 'en' // this used for numeral lib - pt-br, en ...
}
const currenciesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CURRENCIES_SET_PRICE_FULFILLED':
			//it's being forbided to execute, because of middleware
			//instead, use *_COMPLETED
			state = {
				...state,
				price: action.payload
			}
			break;
		case 'CURRENCIES_SET_PRICE_COMPLETED':
			state = {
				...state,
				price: action.payload
			}
	}
	return state;
}

export default currenciesReducer;
