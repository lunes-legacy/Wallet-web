export const setWalletInfo = (walletInfo) => {
	// walletInfo = {LNS: '37RThBWionPuAbr8H4pzZJM6HYP2U6Y9nLr', BTC: '2N2W5SqkewRfANAzSg4TdVf8KjYLuoiWQDu'}
	return {
		type: 'WALLET_SET_INFO',
		payload: walletInfo
	}
}
