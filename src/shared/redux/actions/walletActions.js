import { WalletClass } from 'Classes/Wallet';
const Wallet = new WalletClass();
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
export const setTxHistory = (data) => {
	data.address = 'moNjrdaiwked7d8jYoNxpCTZC4CyheckQH';
	return {
		type: 'WALLET_SET_COIN_HISTORY',
		payload: Wallet.getTxHistory({network: data.network, address: data.address})
	}
}
