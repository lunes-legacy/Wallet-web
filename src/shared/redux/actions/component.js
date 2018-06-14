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
	console.log(data)
	data.address = '17JzE6xsyu4kZbLosvAKUXHdbU9arAp8Uf';
	//data.address = '37jxbsXCjQJ1cvzG3DdMC5xMxT73ab6DLDM';
	return {
		type: 'WALLET_SET_COIN_HISTORY',
		payload: Wallet.getTxHistory({network: data.network, address: data.address})
	}
	
	// return {
	// 	type: 'WALLET_SET_COIN_HISTORY_FULFILLED',
	// 	payload: JSON.parse(staticHistory)
	// }
}
// export const setCurrentNetwork = () => {
// 	return {
// 		type: 'WALLET_SET_CURRENTNETWORK',
// 		payload: {}
// 	}
// }
