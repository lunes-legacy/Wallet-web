import { BLOCK_EXPLORERS, TESTNET } from 'Config/constants';

export const getTxidLink = (network, txid) => {
	if (network.search(/lns/i) !== -1) {
		network = 'lunes';
	}

	const networkConstant = TESTNET ? network.toUpperCase() + 'TEST' : network.toUpperCase();
	const explorer = BLOCK_EXPLORERS[network];

	if (network.indexOf('lunes') === -1) {
		return `${explorer}tx/${networkConstant}/${txid}`
  }

	return `${explorer}tx/${txid}`;
}
