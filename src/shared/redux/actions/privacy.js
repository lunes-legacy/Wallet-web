export const setWalletInfo = (walletInfo) => { 
	return {
		type: 'WALLET_SET_INFO',
		payload: walletInfo
	}
}
