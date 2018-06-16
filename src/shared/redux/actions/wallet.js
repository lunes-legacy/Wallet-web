import { WalletClass } from 'Classes/Wallet';

const Wallet = new WalletClass();

export const togglePanelLeft = () => {
	return {
		type: 'WALLET_TOGGLE_PANEL_LEFT',
		payload: status
	}
}
