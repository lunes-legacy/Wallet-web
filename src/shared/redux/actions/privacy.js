export const setWalletInfo = (walletInfo) => { 
	return {
		type: 'WALLET_SET_INFO',
		payload: walletInfo
	}
}

export const getWalletInfo = () => { 
	return {
		type: 'WALLET_GET_INFO',
	}
}
