let initialState = {
	wallet: {
		currentNetwork: 'lns',
		currentTxHistory: [],
		isPanelRightVisible: false,
		modalSend: {
			status: {
				type: 'initial', //initial, loading, error, complete
				message: 'Son of a bitch'
			}, 
			txid: undefined
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
		case 'WALLET_MODALSEND_SETTER':
			state = {
				...state,
				wallet: {
					...state.wallet,
					modalSend: {
						...state.wallet.modalSend,
						...action.payload
					}
				}
			}
			return state;
		default:
			return state;
	}
}

export default componentReducer;
