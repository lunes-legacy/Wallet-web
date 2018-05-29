// if (action.type === 'WALLET_OPEN_PANELRIGHT') {
// 		//action.payload: { 
// 		// 	coinPrice: 
// 		// 		{
// 		// 			USD: 1, 
// 		// 			BRL: 2
// 		// 		}, 
// 		// 	coinName: String() 
// 		//}
// 		return {
// 			...state,
// 			panelRight: {
// 				...state.panelRight,
// 				...action.payload,
// 				status: 'open'
// 			}
// 		}
// 	} else 
const initialState = {
	panelRight: {
		status: 'closed'
	},
	panelLeft: {
		status: 'open'
	}
}

const walletReducer = (state = initialState, action) => {
	if (action.type === 'WALLET_SET_BALANCE') {
		// EX: action.payload: { 
		// 	balance, 
		// 	coinsPrice 
		// }
		return {
			...state,
			panelLeft: {
				...state.panelLeft,
				...action.payload
			}
		}
	} else if (action.type === 'WALLET_TOGGLE_PANEL_LEFT') {
		// EX: action.payload = 'closed' || 'open'
		let status = state.panelLeft.status === 'open' ? 'closed' : 'open';
		return {
			...state,
			panelLeft: {
				...state.panelLeft,
				status: status
			}
		}
	} else if (action.type === 'WALLET_SET_COIN_HISTORY') {
		// action.payload = [
		// 	{
		// 		value: 1.003,
		// 		type: 'RECEIVED' || 'SPENT',
		// 		time: [timestamp],
		// 		...all bitcoin transaction infomation
		// 	}
		// ]
		return {
			...state,
			panelRight: {
				...state.panelRight,
				coinHistory: action.payload
			}
		}
	}
	return state;
}

export default walletReducer;
