let initialState = {
	wallet: {
		currentNetwork: '',
		currentTxHistory: [
			// {
			// 	type: 'RECEIVED',
			// 	otherParams: {},
			// 	txid: '.......',
			// 	date: 1517446725,
			// 	blockHeight: 1261725,
			// 	nativeAmount: 200000000,
			// 	networkFee: 100000
			// }
		],
		isPanelRightVisible: false
	}
}
const componentReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'WALLET_OPEN_PANELRIGHT':
			state = {
				...state,
				wallet: {
					...state.wallet,
					currentNetwork: action.payload.currentNetwork,
					isPanelRightVisible: true
				}
			}
			return state;
			break;
		case 'WALLET_SET_COIN_HISTORY_FULFILLED':
			// action.payload = [
			// 	{
			// 		value: 1.003,
			// 		type: 'RECEIVED' || 'SPENT',
			// 		time: [timestamp],
			// 		...all bitcoin transaction infomation
			// 	}
			// ]
			state = {
				wallet: {
					...state.wallet,
					currentTxHistory: action.payload
				}
			}
		default:
			return state;
		break;
	}
	return state;
}

export default componentReducer;
