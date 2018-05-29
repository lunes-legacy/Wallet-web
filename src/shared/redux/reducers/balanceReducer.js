let initialState = { 
	BTC: { 
		total_confirmed: 2.9, 
		total_unconfirmed: 1,
		total_amount: 3.9, 
		img: 'btc.svg'
	},
	ETH: { 
		total_confirmed: 1.2, 
		total_unconfirmed: 1,
		total_amount: 2.2, 
		img: 'eth.svg'
	},
	LNS: {
		total_confirmed: 100, 
		total_unconfirmed: 0,
		total_amount: 100, 
		img: 'lns.svg'
	},
	LTC: {
		total_confirmed: 100, 
		total_unconfirmed: 0,
		total_amount: 100, 
		img: 'ltc.svg'
	},
	DASH: {
		total_confirmed: 100, 
		total_unconfirmed: 0,
		total_amount: 100, 
		img: 'dash.svg'
	},
	NANO: {
		total_confirmed: 100, 
		total_unconfirmed: 0,
		total_amount: 100, 
		img: 'nano.svg'
	}
}
const balanceReducer = (state = initialState, action) => {
	if (action.type === 'WALLET_SET_BALANCE') {
		state = action.payload;
	}
	return state;
}

export default balanceReducer;
