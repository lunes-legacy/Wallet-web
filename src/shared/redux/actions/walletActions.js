export const setBalance = () => {
	return {
		type: 'WALLET_SET_BALANCE',
		payload: { balance, coinsPrice }
	}
}
export const togglePanelLeft = () => {
	return {
		type: 'WALLET_TOGGLE_PANEL_LEFT',
		payload: status
	}
}
