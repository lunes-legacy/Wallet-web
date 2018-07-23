import { WalletClass } from "Classes/Wallet";
import { TESTNET } from 'Config/constants';
import { coins } from 'lunes-lib';

const Wallet = new WalletClass();

// addresses = { LNS: lunes addrees, BTC: bitcoin address... }
export const setBalance = data => {
  return {
    type: "WALLET_SET_BALANCE",
    payload: Wallet.getAddressesBalance(data.addresses)
  };
};

export const setUniqueBalance = (data) => {
  console.log('setUniqueBalance -> DATA:::',data);
	let { network, address, testnet } = data;
	if (!testnet)
		testnet = TESTNET;
	if (!network)
		throw errorPattern("No network name was settled on trying to set an unique balance",500,'BALANCE_UNIQUE_ERROR');
	if (!address)
		throw errorPattern("No address was settled on trying to set the an unique balance",500,'BALANCE_UNIQUE_ERROR');
	return {
		type: 'WALLET_SET_UNIQUE_BALANCE',
		payload: coins.services.balance(network, address, testnet)
	}
}
