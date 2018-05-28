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
		]
	}
}
const componentReducer = (state = initialState, action) => {
	
	return state;
}

export default componentReducer;
