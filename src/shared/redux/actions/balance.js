
import { WalletClass } from 'Classes/Wallet';
const Wallet = new WalletClass();

export const setBalance = (data) => {
	console.log('data_1', data)
	return {
		type: 'WALLET_SET_BALANCE',
		payload: Wallet.getAddressesBalance({ address: data.address.LNS }),
	}
}