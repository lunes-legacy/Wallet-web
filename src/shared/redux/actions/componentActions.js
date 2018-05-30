import { WalletClass } from 'Classes/Wallet';
const Wallet = new WalletClass();
export const openPanelRight = () => {
	return {
		type: 'WALLET_OPEN_PANELRIGHT',
		payload: {}
	}
}
export const setTxHistory = (data) => {
	// data.address = 'moNjrdaiwked7d8jYoNxpCTZC4CyheckQH';
	return {
		type: 'WALLET_SET_COIN_HISTORY',
		payload: Wallet.getTxHistory({network: data.network, address: data.address})
	}
}
// export const setCurrentNetwork = () => {
// 	return {
// 		type: 'WALLET_SET_CURRENTNETWORK',
// 		payload: {}
// 	}
// }
