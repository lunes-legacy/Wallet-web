let initialState = {
	default: 'BTC',
	price: {
		BTC: { USD: 10000, BRL: 30000, EUR: 8000 },
		ETH: { USD: 400,   BRL: 1200,  EUR: 380  },
		LNS: { USD: 2,     BRL: 6,     EUR: 1.8  }
	}
}
const cryptocurrenciesReducer = (state = initialState, action) => {
	
	return state;
}

export default cryptocurrenciesReducer;
