export const setBalance = (balance) => {
	return {
		type: 'WALLET_SET_BALANCE',
		payload: balance
	}
}
