let initialState = {
	default: 'BRL',
	price: {
		BRL: { USD: 0.3, EUR: 0.2 },
		USD: { BRL: 3, EUR: 1.2 },
		EUR: { USD: 0.8, BRL: 4 }
	}
}
const currenciesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CURRENCIES_SET_PRICE_FULFILLED':
			state = {
				...state,
				price: action.payload
			}
			break;
	}
	return state;
}

export default currenciesReducer;
