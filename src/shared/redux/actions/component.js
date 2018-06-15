import { WalletClass } from 'Classes/Wallet';

const Wallet = new WalletClass();

export const openPanelRight = (data) => {
	return {
		type: 'WALLET_OPEN_PANELRIGHT',
		payload: {
			currentNetwork: data.currentNetwork
		}
	}
}
export const setTxHistory = (data) => {
	return {
		type: 'WALLET_SET_COIN_HISTORY',
		payload: Wallet.getTxHistory({network: data.network, address: data.address})
	}
}
