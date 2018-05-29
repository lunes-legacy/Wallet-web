let initialState = {
	wallet: {
		'//':'Deve vir dinamicamente, conforme o usuário clica na moeda, veja a action: getTxHistory()',
		currentNetwork: '',
		currentTxhistory: [
			{
				type: 'RECEIVED',
				otherParams: {},
				txid: '.......',
				date: 1517446725,
				blockHeight: 1261725,
				nativeAmount: 200000000,
				networkFee: 100000
			}
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
					isPanelRightVisible: true 
				}
			}
			return state;
		break;
		case '1':
		break;
		default:
			return state;
		break;
	}
	return state;
}

export default componentReducer;
