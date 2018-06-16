let initialState = {
	wallet: {
		currentNetwork: 'lns',
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
		isPanelRightVisible: false,
		send: {
			status: 'initial', //initial, loading, error, success
			choosenFee: undefined,
		}
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
		case 'WALLET_SET_COIN_HISTORY_PENDING':
			state = {
				wallet: {
					...state.wallet,
					currentTxHistory: []
				}
			}
			return state;
		case 'WALLET_SET_COIN_HISTORY_FULFILLED':
			state = {
				wallet: {
					...state.wallet,
					currentTxHistory: action.payload
				}
			}
			return state;
		case 'WALLET_SET_SEND_PROPS':
			state = {
				...state,
				wallet: {
					...state.wallet,
					send: {
						...state.wallet.send,
						...action.payload
					}
				}
			}
			return state;
		default:
			return state;
	}
	return state;
}

export default componentReducer;
