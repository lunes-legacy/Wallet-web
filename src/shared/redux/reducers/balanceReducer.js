let initialState = { 
	BTC: { 
		total_confirmed: 2.9, 
		total_unconfirmed: 1,
		total_amount: 3.9
	},
	ETH: { 
		total_confirmed: 1.2, 
		total_unconfirmed: 1,
		total_amount: 2.2
	},
	LNS: {
		total_confirmed: 100, 
		total_unconfirmed: 0,
		total_amount: 100
	}
}
const balanceReducer = (state = initialState, action) => {
	
	return state;
}

export default balanceReducer;
