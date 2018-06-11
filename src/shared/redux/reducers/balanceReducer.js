let initialState = { 
	// BTC: { 
	// 	total_confirmed: 2.09, 
	// 	total_unconfirmed: 1,
	// 	total_amount: 3.9, 
	// 	img: 'btc.svg',
	// 	coinName: 'Bitcoin'
	// },
	// ETH: { 
	// 	total_confirmed: 1.02, 
	// 	total_unconfirmed: 1,
	// 	total_amount: 2.2, 
	// 	img: 'eth.svg',
	// 	coinName: 'Ethereum'
		
	// },
	LNS: {
		total_confirmed: 100, 
		total_unconfirmed: 0,
		total_amount: 100, 
		img: 'lns.svg',
		coinName: 'Lunes'
	},
	// LTC: {
	// 	total_confirmed: 100, 
	// 	total_unconfirmed: 0,
	// 	total_amount: 100, 
	// 	img: 'ltc.svg', 
	// 	coinName: 'Litecoin'

	// },
	// DASH: {
	// 	total_confirmed: 100, 
	// 	total_unconfirmed: 0,
	// 	total_amount: 100, 
	// 	img: 'dash.svg',
	// 	coinName: 'Dashcoin'
	// },
	// NANO: {
	// 	total_confirmed: 100, 
	// 	total_unconfirmed: 0,
	// 	total_amount: 100, 
	// 	img: 'nano.svg',
	// 	coinName: 'Nano'
	// }
}
const balanceReducer = (state = initialState, action) => {
	if (action.type === 'WALLET_SET_BALANCE') {
		state = action.payload;
	}
	return state;
}

export default balanceReducer;
